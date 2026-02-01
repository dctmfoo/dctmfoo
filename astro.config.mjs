import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    starlight({
      title: 'VCF 9 Deployment Guide',
      description: 'Comprehensive guide for VMware Cloud Foundation 9.0 deployment',
      social: {
        github: 'https://github.com/vmware/vcf-security-and-compliance-guidelines',
      },
      customCss: [
        './src/styles/custom.css',
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Executive Summary', link: '/overview/summary/' },
            { label: 'Architecture Overview', link: '/overview/architecture/' },
            { label: 'Version Evolution', link: '/overview/version-evolution/' },
          ],
        },
        {
          label: 'Requirements',
          items: [
            { label: 'vSphere / ESXi', link: '/requirements/vsphere/' },
            { label: 'vSAN Storage', link: '/requirements/vsan/' },
            { label: 'NSX Networking', link: '/requirements/nsx/' },
            { label: 'Network Prerequisites', link: '/requirements/network/' },
            { label: 'DNS, NTP & Certificates', link: '/requirements/dns-ntp-certs/' },
            { label: 'Licensing Model', link: '/requirements/licensing/' },
          ],
        },
        {
          label: 'Deployment',
          items: [
            { label: 'Cloud Builder / VCF Installer', link: '/deployment/cloud-builder/' },
            { label: 'Management Domain', link: '/deployment/management-domain/' },
            { label: 'Workload Domains', link: '/deployment/workload-domains/' },
          ],
        },
        {
          label: 'Integration',
          items: [
            { label: 'Identity Integration', link: '/integration/identity/' },
            { label: 'VCF Operations (Aria)', link: '/integration/aria-operations/' },
            { label: 'Backup Integration', link: '/integration/backup/' },
            { label: 'Lifecycle Management', link: '/integration/lifecycle/' },
            { label: 'RBAC & Security', link: '/integration/rbac-security/' },
          ],
        },
        {
          label: 'Migration',
          items: [
            { label: 'SDDC Manager Changes', link: '/migration/sddc-manager/' },
            { label: 'Upgrade Path (5.2 → 9.0)', link: '/migration/upgrade-path/' },
            { label: 'Migration Gotchas', link: '/migration/gotchas/' },
          ],
        },
        {
          label: 'Hardware',
          items: [
            { label: 'Dell PowerEdge Servers', link: '/hardware/dell-servers/' },
          ],
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#1a365d',
          },
        },
      ],
    }),
  ],
});
