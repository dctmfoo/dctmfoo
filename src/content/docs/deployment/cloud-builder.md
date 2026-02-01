---
title: VCF Installer (Cloud Builder)
description: VCF Installer appliance and bring-up process
---

## VCF 9 Cloud Builder & Bring-up Process

### Cloud Builder vs VCF Installer

VCF 9 introduces the **VCF Installer appliance**, completely replacing Cloud Builder used in VCF 5.2 and earlier. Key changes:

- **Excel workbook eliminated** - The Deployment Parameter Workbook is deprecated; replaced by a wizard-based UI or JSON specification files
- **Unified appliance** - VCF Installer is delivered as part of the same OVA as SDDC Manager
- **Two input methods** - Interactive UI wizard for guided deployment, or JSON file upload for automation and customization
- **Fleet architecture** - New "VCF Fleet" concept allows single VCF Operations and Automation instances to manage multiple VCF instances

**Deployment Models:**
- **Simple Model**: Minimum 7 appliances (single vCenter, SDDC Manager, NSX Manager, VCF Operations Manager, Fleet Management, Collector, VCF Automation)
- **HA Model**: Minimum 13 appliances (3x NSX Manager, 3x VCF Operations, 3x VCF Automation nodes, plus Logs and VKS)

### Prerequisites for Bring-up

**Infrastructure Requirements:**
- DNS entries pre-configured for all components (validation fails without correct DNS)
- NTP synchronization across all hosts (same NTP server required)
- Dedicated VLANs/subnets: Management, VM Management, vMotion, vSAN, Host TEPs for NSX

**Password Requirements:**
- ESXi root passwords must contain at least 1 special character from [@!#$%?^]
- Only letters, numbers, and those special characters allowed
- UI wizard requires common password across all ESXi hosts; JSON spec allows different passwords per host

**Parameter Files:**
- **VCF Planning and Preparation Workbook** - Download from techdocs.broadcom.com for design and sizing
- **JSON Specification File** - Generated from wizard or manually created; supports customizations not available in wizard
- Warning: JSON spec saves credentials in plain text; store securely

### Bring-up Process Overview

**High-Level Steps:**
1. Deploy VCF Installer appliance to an ESXi host via VMware Host Client
2. Configure network access to ESXi hosts and VM management network
3. Generate Broadcom API token for depot access
4. Download binaries via VCF Download Tool (only supported method)
5. Access installer UI at `https://installer_appliance_FQDN`
6. Complete deployment wizard or upload JSON specification
7. Run validation checks
8. Execute deployment

**Typical Timeline:**
- **4-6 hours** for complete deployment including VCF Operations and VCF Automation
- Nested environments take longer
- Validation phase runs before actual deployment begins

### Imaging Bundle

**What's Included in VCF 9.0:**
- ESXi ISO (VMware-VMvisor-Installer-9.0.0.0.24755229.x86_64.iso)
- NSX Manager OVA (nsx-unified-appliance-9.0.0.0.24733065.ova)
- SDDC Manager/VCF Installer (VCF-SDDC-Manager-Appliance-9.0.0.0.24703748.ova)
- vCenter ISO (VMware-VCSA-all-9.0.0.0.24755230.iso)
- VCF Operations appliances

**Download Process:**
1. Access Broadcom Support Portal
2. Accept Terms and Conditions and Compliance Reporting Terms
3. Use VCF Download Tool (required - no third-party tools supported)
4. Generate Broadcom API token for depot connections
5. Offline depot supported for air-gapped environments

### Common Issues

**Deployment Failures:**
- FQDN with uppercase letters causes deployment failure - VCF no longer allows uppercase in FQDN input
- Missing ESXi thumbprints fails validation - add `"skipEsxThumbprintValidation": true` to JSON if you trust environment
- Gateway ping failures on flat networks - add `"skipGatewayPingValidation": true` to JSON
- Cloned ESXi VMs cause subtle issues - avoid cloning ESXi hosts

**Post-Deployment Issues:**
- 401 UNAUTHORIZED errors during deployments if user logs out or session times out - keep UI active during deployment
- VCF Automation deployment fails if FQDN has uppercase characters
- Custom network adapters may not start after upgrade to 9.0
- Local Groups assigned to Projects lose access after 8.x to 9.0 migration - remove and re-add groups

**Troubleshooting Resources:**
- VCF Diagnostics Findings for automated issue detection
- LogAssist integration for direct log bundle transfer to Broadcom Support
- Deploy VCF Operations for Logs for centralized logging

### Sources

- [VCF 9 Deployment Best Practices - Puneet Sharma](https://puneetsharma.blog/2025/07/22/vcf-9-deployment-best-practices-avoiding-common-pitfalls-for-a-smooth-private-cloud-journey/)
- [Deploy the VCF Installer Appliance - Broadcom TechDocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/deployment/deploying-a-new-vmware-cloud-foundation-or-vmware-vsphere-foundation-private-cloud-/preparing-your-environment/deploy-the-vmware-cloud-foundation-installer-appliance.html)
- [VCF Installer Walkthrough - VxWorld](https://vxworld.co.uk/2025/06/29/vmware-cloud-foundation-9-vcf-installer-walkthrough/)
- [VMware Cloud Foundation 9 Troubleshooting - VMware Blog](https://blogs.vmware.com/cloud-foundation/2025/08/19/how-vmware-cloud-foundation-9-simplifies-troubleshooting/)
- [JSON Specification Deployment - Broadcom TechDocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/deployment/deploying-a-new-vmware-cloud-foundation-or-vmware-vsphere-foundation-private-cloud-/use-a-json-specification-to-deploy-vmware-cloud-foundation-or-vmware-vsphere-foundation.html)
- [VCF 9 Download Instructions - Broadcom KB](https://knowledge.broadcom.com/external/article/401497)
- [VCF Known Issues - Broadcom KB](https://knowledge.broadcom.com/external/article/415800/vmware-cloud-foundation-vcf-known-issues.html)
- [VCF 9 Installation Troubleshooting - ViquarCloud](https://www.viquarcloud.com/post/vmware-cloud-foundation-9-installation-troubleshooting-know-where-to-look)
