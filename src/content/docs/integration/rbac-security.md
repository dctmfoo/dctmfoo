---
title: RBAC & Security
description: Role-based access control and security hardening in VCF 9
---

## VCF 9 RBAC & Security

### RBAC Model

VCF 9 implements comprehensive role-based access control across the platform:

- **Isolated Management Domains**: Each VCF Domain has its own SSO boundary and software-defined infrastructure with granular control over who can access what objects
- **Multi-Tenant RBAC**: Provider Admin Portal includes default system-level roles automatically published to all Organizations; custom roles can be created and published selectively
- **Least Privilege Enforcement**: Granular RBAC protects sensitive password information with comprehensive audit trails and logging
- **API-Level Permissions**: Permissions, roles, and access management available through OpenAPI 3.0-compliant interfaces
- **Identity Federation**: Support for Active Directory as identity provider and authentication source across SDDC Manager, vCenter Server, ESXi, and NSX

### Security Hardening

**Security Configuration & Hardening Guide (SCG)**:
- VMware's 17+ year baseline for hardening VMware Cloud Foundation and vSphere Foundation including vSAN
- VCF 9.0.0 guide supersedes all earlier versions

**Key Hardening Improvements in VCF 9**:
- Removed legacy attack surfaces: CIM, SLP, Update Manager Baselines, manual SSH edits
- Deprecated: Smart Card/RSA SecureID support from ESX, Integrated Windows Authentication from vCenter, vSphere Trust Authority
- Native APIs replace outdated components
- TLS 1.3-only profile available ("NIST_2024_TLS_13_ONLY")

**New VCF 9 Security Baseline**: Consolidated out-of-box benchmark for compliance measurement

### FIPS/STIG Compliance

**FIPS 140-2/140-3**:
- vSphere runs in FIPS-compliant mode by default using FIPS 140-2 certified cryptographic modules
- VCF components support FIPS standard inherently
- FIPS 140-3 revalidation in progress for full stack enablement by default
- VCF Operations: Enable FIPS during OVA deployment or post-deployment (cannot be deactivated once enabled)

**STIG Support**:
- Official VMware Cloud Foundation 9.x STIG documentation available
- Tutorials separated into product-based and appliance-based rules
- STIG Readiness Guides self-published by VMware when DISA process pending
- Alignment with DISA STIG for account management, service/protocol management, boot integrity (UEFI Secure Boot, TPM)

**Regulatory Frameworks**: VCF aids compliance with FISMA/NIST SP 800-53 through RBAC, centralized logging, secure configuration enforcement, and TLS cipher controls

### Certificate Security

**Unified Certificate Management**:
- Centralized management within VCF Operations Fleet Management
- Non-disruptive certificate updates with automatic renewals
- VCF Management components: Microsoft CA only
- VCF Instance components: Microsoft CA or OpenSSL

**Auto-Renewal Capabilities**:
- Supports all management elements: ESX hosts, infrastructure management appliances, management components
- Fleet Management appliance acts as CA for management components
- Critical for upcoming 47-day certificate lifespans (CA/Browser Forum mandate)

**Security Operations Dashboard**: Real-time view of certificate health, host encryption, vSAN cluster encryption, CVE advisories, and VM encryption status

### Best Practices

1. Replace default certificates with trusted enterprise CA-signed certificates immediately after deployment
2. Never dismiss browser security warnings for self-signed certificates on production infrastructure
3. Implement identity federation over legacy authentication methods
4. Enable TLS 1.3-only profile for enhanced security
5. Use STIG guidance even if not DOD-subject—it provides highest security bar
6. Monitor certificate expiration proactively via Security Operations Dashboard
7. Enable FIPS compliance at deployment time rather than post-deployment for less disruption

### Sources

- [VCF 9 RBAC - Broadcom TechDocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/design/design-library/vcf-automation-deployment-models(1)/vcf-automation-identity-management/role-base-access-control.html)
- [Security in VMware Cloud Foundation 9.0](https://blogs.vmware.com/cloud-foundation/2025/08/05/security-vmware-cloud-foundation-9-0/)
- [VCF STIG Documentation](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/stig/9-0/vcf-stig-documentation/docs-overview-overview.html)
- [FIPS Configuration for VCF](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/fleet-management/fips-compliance-for-vcf-components.html)
- [Certificate Management in VCF 9](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/fleet-management/certificate-management-9-0.html)
- [Automatic Certificate Renewal in VCF 9.0](https://blogs.vmware.com/cloud-foundation/2025/06/19/automatic-certificate-renewal-in-vcf-9/)
- [GitHub - VCF Security and Compliance Guidelines](https://github.com/vmware/vcf-security-and-compliance-guidelines)
- [GitHub - DoD Compliance and Automation](https://github.com/vmware/dod-compliance-and-automation)
- [Infrastructure Boundaries and Controls in VCF 9.0](https://blogs.vmware.com/cloud-foundation/2025/11/11/infrastructure-boundaries-controls-and-policies-with-vmware-cloud-foundation-9-0/)
