/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: '**',
        }, ],
        domains: [
            'loremflickr.com',
            'tdhdjernzsaepxgzandc.supabase.co',
            'media.licdn.com',
            'lh3.googleusercontent.com',
            'pbs.twimg.com',
            'media-exp1.licdn.com',
            'platform-lookaside.fbsbx.com',
            'tailus.io',
            'jrgivjodpnydgnfmeelp.supabase.co',
        ],
    },
    async headers() {
        return [{
            // matching all API routes
            source: '/api/:path*',
            headers: [
                { key: 'Access-Control-Allow-Credentials', value: 'true' },
                { key: 'Access-Control-Allow-Origin', value: '*' },
                {
                    key: 'Access-Control-Allow-Methods',
                    value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                },
                {
                    key: 'Access-Control-Allow-Headers',
                    value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                },
                { key: 'mode', value: 'no-cors' },
            ],
        }, ]
    },
}

module.exports = nextConfig