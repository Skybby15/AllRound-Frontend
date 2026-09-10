import { AuthenthicationResourceApi, Configuration, SphereResourceApi } from "@/api";
import { getWideAccessToken } from "./tokenStore";

const configuration = new Configuration({
    basePath: process.env.NEXT_PUBLIC_API_URL,
    accessToken: () => getWideAccessToken()
});

export const authApi = new AuthenthicationResourceApi(configuration);
export const sphereApi = new SphereResourceApi(configuration);
