import { useEffect, useRef } from "react";
import * as THREE from "three";
import getStarfield from "@/three/getStarfield";
import { drawThreeGeo } from "@/three/threeGeoJSON";

interface GlobeSceneProps {
    animating: boolean;
    withGlobe?: boolean;
}

export default function GlobeScene({ animating, withGlobe = true }: GlobeSceneProps) {
    const animateRef = useRef(animating);
    const containerRef = useRef<HTMLDivElement>(null);
    const clock = useRef<THREE.Timer>(new THREE.Timer());

    useEffect(() => {
        animateRef.current = animating;
    }, [animating]);

    useEffect(() => {
        let disposed = false;

        const init = async () => {
            const container = containerRef.current;
            if (!container) return;

            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x000000);

            const width = container.clientWidth;
            const height = container.clientHeight;

            const camera = new THREE.PerspectiveCamera(75, width / height, 1, 100);
            camera.position.z = 3;

            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            });

            if (disposed) {
                renderer.dispose();
                return;
            }

            renderer.setPixelRatio(1);
            renderer.setSize(width, height);

            container.appendChild(renderer.domElement);

            // Stars
            const stars = getStarfield({
                numStars: 1000,
            });

            scene.add(stars);

            const globeGroup = new THREE.Group();
            scene.add(globeGroup);

            let clearGlobe = () => {};

            if (withGlobe) {
                // Globe wireframe
                const geometry = new THREE.SphereGeometry(2);

                const lineMaterial = new THREE.LineBasicMaterial({
                    color: 0x222222,
                });

                const edges = new THREE.EdgesGeometry(geometry, 1);
                const wireframe = new THREE.LineSegments(edges, lineMaterial);
                globeGroup.add(wireframe);

                // Dark globe
                const globeMaterial = new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    transparent: true,
                    opacity: 0.8,
                });

                const globe = new THREE.Mesh(geometry, globeMaterial);
                globe.scale.setScalar(0.99);
                globeGroup.add(globe);

                //Countries
                fetch("/assets/geojson/ne_110m_land.json")
                    .then((res) => res.json())
                    .then((json) => {
                        if (disposed) return;

                        const countries = drawThreeGeo({
                            json,
                            radius: 2,
                        });

                        globeGroup.add(countries);
                    });

                globeGroup.rotation.z = THREE.MathUtils.degToRad(-23.4);

                globeGroup.rotation.x += THREE.MathUtils.randFloat(-1, 1);
                globeGroup.rotation.y += THREE.MathUtils.randFloat(-1, 1);

                clearGlobe = () => {
                    geometry.dispose();
                    edges.dispose();
                    lineMaterial.dispose();
                    globeMaterial.dispose();
                };
            }

            const animation = () => {
                clock.current.update();

                if (animateRef.current) {
                    const delta = clock.current.getDelta();

                    globeGroup.rotation.x += delta * 0.06;
                    globeGroup.rotation.y += delta * 0.03;

                    stars.rotation.y += delta * 0.012;
                    stars.rotation.x += delta * 0.006;
                    renderer.render(scene, camera);
                }
            };

            renderer.setAnimationLoop(animation);

            let resizeRequested = false;

            const handleResize = () => {
                if (resizeRequested) return;

                resizeRequested = true;

                requestAnimationFrame(() => {
                    resizeRequested = false;

                    if (!containerRef.current) return;

                    const width = containerRef.current.clientWidth;
                    const height = containerRef.current.clientHeight;

                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();

                    renderer.setSize(width, height);
                    renderer.render(scene, camera);
                });
            };
            window.addEventListener("resize", handleResize);

            const handleVisibilityChange = () => {
                if (document.hidden) {
                    renderer.setAnimationLoop(null);
                } else {
                    renderer.setAnimationLoop(animation);
                }
            };
            document.addEventListener("visibilitychange", handleVisibilityChange);

            return () => {
                renderer.setAnimationLoop(null);

                window.removeEventListener("resize", handleResize);
                document.removeEventListener("visibilitychange", handleVisibilityChange);

                clearGlobe();

                scene.clear();

                renderer.dispose();

                containerRef.current?.removeChild(renderer.domElement);
            };
        };

        const cleanup: Promise<(() => void) | undefined> = init().catch((err) => {
            console.error(err);
            return undefined;
        });

        return () => {
            disposed = true;
            cleanup.then((fn) => fn?.());
        };
    }, [clock]);

    return <div ref={containerRef} className="absolute inset-0 z-[-1] overflow-hidden" />;
}
