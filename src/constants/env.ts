declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BUILD_MODE: 'development' | 'staging' | 'production';
            // REACT_APP_API_URL: string;
        }
    }
}

export { }