/** @type {import('next').NextConfig} */

import nextPwa from 'next-pwa'

const withPwa = nextPwa({
    disable: false,
    register: true,
    dest: 'public',
})

const nextConfig = withPwa({
    // reactStrictMode: true,
})

export default nextConfig