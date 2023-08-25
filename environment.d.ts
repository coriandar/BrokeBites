declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_FB_API_KEY: string
    readonly NEXT_PUBLIC_FB_AUTH_DOMAIN: string
    readonly NEXT_PUBLIC_FB_PROJECT_ID: string
    readonly NEXT_PUBLIC_FB_STORAGE_BUCKET: string
    readonly NEXT_PUBLIC_FB_MESSAGING_SENDER_ID: string
    readonly NEXT_PUBLIC_FB_APP_ID: string
    readonly NEXT_PUBLIC_FB_MEASUREMENT_ID: string
  }
}
