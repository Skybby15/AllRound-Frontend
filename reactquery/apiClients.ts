import { AuthenthicationResourceApi, Configuration } from "@/api";

const configuration = new Configuration({
    basePath: process.env.NEXT_PUBLIC_API_URL,
});

export const authApi = new AuthenthicationResourceApi(configuration);
