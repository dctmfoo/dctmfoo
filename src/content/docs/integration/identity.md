---
title: Identity Integration
description: VCF Identity Broker and SSO configuration
---

## VCF 9 Identity Integration

VMware Cloud Foundation 9 introduces VCF Identity Broker (vIDB), replacing Workspace ONE Access as the central identity management component.

### Identity Sources Supported

VCF 9 supports a wide range of identity providers:
- **Active Directory/LDAP** - Traditional directory services
- **OpenLDAP** - Open-source LDAP implementations
- **Microsoft Entra ID (Azure AD)** - Cloud identity provider
- **Active Directory Federation Services (ADFS)** - On-premises federation
- **Okta** - Cloud identity platform
- **Ping Identity** - Enterprise identity management
- **Generic SAML 2.0** - Any SAML 2.0-compliant provider
- **OIDC-compliant providers** - Including Keycloak

### VCF Identity Broker (VIDB)

VCF Identity Broker is the central identity intermediary between external identity providers and VCF components (vCenter, NSX, VCF Operations/Automation). It standardizes federation and authentication, reduces configuration complexity, and centralizes access controls.

**Deployment Modes:**
- **Embedded Mode** - Runs as a container inside the management domain vCenter Server. Recommended for smaller, single-instance VCF deployments. Requires no separate maintenance.
- **Appliance Mode** - Deployed as a 3-node cluster of standalone VIDB appliances for high availability. Recommended for large-scale infrastructures. A single external vIDB cluster can serve up to five VCF instances, unifying them into a single identity space.

### Integration Steps

1. **Prepare identity source** - Ensure AD/LDAP domain is functional with a service account having read permissions
2. **Configure DNS** - Verify FQDN resolution between VCF components and domain controllers
3. **Access VCF Operations** - Login and navigate to Fleet Management → Identity & Access
4. **Select deployment type** - Choose embedded or appliance mode for vIDB
5. **Configure identity provider** - Add connection details for AD/LDAP or configure SAML/OIDC provider
6. **Provision users/groups** - Use JIT provisioning, SCIM, or AD/LDAP sync
7. **Set sync frequency** - Configure AD/LDAP sync (default weekly, can be set to daily, hourly, or every 15 minutes)

### SSO / Federation

VCF 9 provides unified SSO across all major management interfaces:
- VCF Operations console
- vSphere Client
- NSX Manager
- VCF Operations for Logs
- VCF Operations for Networks
- VCF Operations HCX
- VCF Automation

**Architecture levels:**
- **Foundation (Fleet Level)** - vIDB connects to corporate IdP for platform-wide SSO
- **Provider Level** - VCF Automation can use vIDB for full SSO or connect to its own IdP
- **Organization Level** - Tenants can connect separate IdPs

**Note:** SDDC Manager UI does not participate in VCF SSO. Continue using local admin accounts (administrator@vsphere.local) for SDDC Manager access.

### Best Practices

- **Pre-create AD groups** (e.g., CloudAdmins, VCF-Operators) and assign roles in VCF Operations, vCenter, and NSX for centralized access management
- **Use appliance mode** for multi-instance or fleet deployments requiring high availability
- **Enable LDAPS** (LDAP with SSL) for secure directory communication
- **Configure appropriate sync frequency** based on user change frequency
- **Implement MFA** through supported identity providers (Okta, Entra ID, Ping)
- **Document service account credentials** used for LDAP bind operations
- **Test SSO before production** to ensure seamless authentication across components

### Sources

- [VCF 9 Deploying VCF Identity Broker](https://vxworld.co.uk/2025/11/11/vcf-9-deploying-vcf-identity-broker/)
- [VMware Cloud Foundation SSO Blog](https://blogs.vmware.com/cloud-foundation/2025/06/19/streamline-administrative-access-with-vcf-single-sign-on/)
- [VCF 9 Identity Broker Overview](https://blog.kimjohansson.se/2025/10/27/vcf9-identity-broker-vidb/)
- [Configure AD/LDAP as Identity Provider](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/fleet-management/what-is/setting-up-sso/cofigure-vmware-cloud-foundation-identity-provider/configure-vmware-cloud-foundation-identity-provider-for-ad-ldap(2).html)
- [Deployment Modes of VCF Identity Broker](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/fleet-management/what-is/deployment-models-for-sso.html)
- [VCF 9 SSO with Keycloak](https://williamlam.com/2025/06/vcf-9-0-single-sign-on-sso-with-keycloak-idp.html)
- [Automating AD/LDAP Sync for VCF SSO](https://williamlam.com/2025/09/automating-vcf-operations-active-directory-over-ldap-sync-for-vcf-sso.html)
- [VCF Identity Broker Deployment Guide](https://gibsonvirt.com/vcf-9-identity-broker-deployment/)
