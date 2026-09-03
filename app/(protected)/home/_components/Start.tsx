import { HomeSection } from "../_types/HomeState";

type StartSectionProps = {
    toPageFn: (state: HomeSection) => void;
};

export default function Start({ toPageFn }: StartSectionProps) {
    return (
        <div className="flex items-center justify-center mb-5 h-full">
            <div className="relative w-full max-w-full h-full max-h-full overflow-hidden">
                <svg
                    viewBox="0 0 500 400"
                    className="
                            group
                            absolute w-full h-full
                            transition-transform duration-300
                            hover:scale-110
                            pointer-events-none
                        "
                >
                    <path
                        className="fill-transparent hover:fill-[#0355fc] pointer-events-auto transition-colors duration-300 cursor-pointer"
                        d="
                                M 20 135
                                H 185
                                C 145 155, 145 245, 185 265
                                H 20
                                C 0 245, 0 155, 20 135
                                Z
                            "
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                    />
                    <text x="20" y="205" fill="white" fontSize="20">
                        My Spheres
                    </text>
                </svg>

                <svg
                    viewBox="0 0 500 400"
                    className="
                            group
                            absolute inset-0 w-full h-full
                            transition-transform duration-300
                            hover:scale-108
                            pointer-events-none
                        "
                >
                    <circle
                        className="hover:fill-orange-700 pointer-events-auto transition-colors duration-300 cursor-pointer"
                        cx="250"
                        cy="200"
                        r="80"
                        fill="transparent"
                        stroke="white"
                        strokeWidth="0.5"

                        onClick={() => toPageFn("create")}
                    />
                    <text x="217" y="205" fill="white" fontSize="20">
                        Create
                    </text>
                </svg>

                <svg
                    viewBox="0 0 500 400"
                    className="
                            group
                            absolute inset-0 w-full h-full
                            transition-transform duration-300
                            hover:scale-110
                            pointer-events-none
                        "
                >
                    <path
                        className="fill-transparent hover:fill-[#0355fc] pointer-events-auto transition-colors duration-300 cursor-pointer"
                        d="
                                M 480 135
                                H 315
                                C 355 155, 355 245, 315 265
                                H 480
                                C 500 245, 500 155, 480 135
                                Z
                            "
                        stroke="white"
                        strokeWidth="0.5"
                    />
                    <text x="380" y="205" fill="white" fontSize="20">
                        Explore
                    </text>
                </svg>
            </div>
        </div>
    );
}
