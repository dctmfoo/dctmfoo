---
title: DNS, NTP & Certificates
description: DNS, NTP, and certificate requirements for VCF 9
---

## DNS, NTP & Certificate Requirements for VCF 9

### DNS Requirements

**Forward and Reverse Records**
- All FQDNs must resolve to unique IP addresses with both A (forward) and PTR (reverse) records
- Required records: SDDC Manager, ESXi hosts, vCenter, NSX Managers, and NSX VIP
- DNS entries must exist before deployment wizard can proceed
- Many bring-up failures occur due to incorrect or missing DNS records

**DNS Server Requirements**
- DNS server must be accessible from all management components
- All hosts configured with DNS server for name resolution
- Management IP of hosts must be queryable for both forward and reverse lookups
- VCF Installer validates DNS by performing lookups for each host during deployment

**Naming Conventions**
- Use consistent FQDN naming across all components
- Number of required FQDNs depends on deployment model (HA vs Single-Node)

### NTP Requirements

**Time Synchronization**
- All components must synchronize with a central NTP source (ESXi, vCenter, NSX, SDDC Manager)
- Time drift causes authentication and deployment failures
- NTP service policy on ESXi hosts: "Start and stop with host"

**NTP Server Configuration**
- NTP server must be reachable from all nodes before deployment
- VCF Installer validates NTP server accessibility during bring-up
- Recommended: Stratum 2 or better NTP source for production environments

**VCF 9 NTP Management**
- NTP configuration moved from SDDC Manager to VCF Operations
- Path: Inventory → VCF Instance → Actions → Manage VCF Instance Settings → Network Settings

### Certificate Requirements

**Certificate Types**
- TLS certificates for all management components
- Default certificates assigned during deployment from Fleet Management CA
- vCenter VMCA certificates for infrastructure components and ESXi hosts
- Custom CA-signed certificates supported for production environments

**Certificate Authority Options**
1. **Fleet Management CA** (new in VCF 9) - Built-in CA for management components with auto-renewal
2. **Microsoft AD Certificate Services** - Enterprise CA integration for signed certificates
3. **vCenter VMCA** - Embedded CA for infrastructure components and ESXi hosts
4. **OpenSSL CA** - SDDC Manager embedded option for infrastructure components only

**Certificate Lifecycle Management**
- Replace default certificates with enterprise CA-signed certificates for production
- Replace certificates when: expired/expiring, revoked, or creating new workload domains
- Subject Alternative Name (SAN) field required for browser validation
- Industry moving toward 47-day certificate lifespans per CA/Browser Forum

**Auto-Renewal in VCF 9**
- Certificate auto-renewal enabled via toggle in VCF Operations UI
- Supports all management elements: ESXi hosts, infrastructure appliances, management components
- Works with VMCA, Microsoft CA, OpenSSL, and self-signed certificates
- Configuration path: Fleet Management → Certificates → Configure CA

### Pre-deployment Checklist

- [ ] DNS forward lookups working for all component FQDNs
- [ ] DNS reverse lookups (PTR records) configured for all IPs
- [ ] NTP server reachable from deployment network
- [ ] Time synchronized across all ESXi hosts
- [ ] VLANs and subnets provisioned and routed
- [ ] IP pools documented for management, workload, vSAN, and NSX overlays
- [ ] Certificate authority strategy defined (default, Microsoft CA, or custom)
- [ ] Network connectivity verified between VCF Installer and external services
- [ ] Microsoft CA server accessible if using enterprise certificates (verify ports/protocols)
- [ ] Time synchronized between Microsoft CA and SDDC Manager if using enterprise CA

### Sources

- [Broadcom TechDocs - Certificate Management](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/fleet-management/certificate-management-9-0.html)
- [Broadcom TechDocs - Configure Certificate Authority](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/fleet-management/certificate-management-9-0/configure-a-certificate-authority_9-0.html)
- [VMware Blog - Automatic Certificate Renewal in VCF 9](https://blogs.vmware.com/cloud-foundation/2025/06/19/automatic-certificate-renewal-in-vcf-9/)
- [VMware Blog - Security in VCF 9.0](https://blogs.vmware.com/cloud-foundation/2025/08/05/security-vmware-cloud-foundation-9-0/)
- [VCF 9 External Requirements - Greenfield Deployment](https://www.viquarcloud.com/post/vmware-cloud-foundation-9-external-requirements-for-a-greenfield-deployment)
- [VCF 9 Ultimate Deployment Guide](https://blog.leaha.co.uk/2025/10/16/vcf-9-ultimate-deployment-guide/)
- [VCF 9 CA Integrated Certificates Management](http://notes.doodzzz.net/2025/06/22/vcf-9-ca-integrated-certificates-management/)
