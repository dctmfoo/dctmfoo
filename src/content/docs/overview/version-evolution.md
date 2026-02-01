---
title: Version Evolution
description: VCF version comparison from 4.5 to 5.2 to 9.0
---

## VCF Version Evolution: 4.5 → 5.2 → 9.0

### Version Comparison Matrix

| Aspect | VCF 4.5 | VCF 5.2 | VCF 9.0 |
|--------|---------|---------|---------|
| **vCenter** | 7.0 U3g | 8.0 U3 | 9.0.0.0 |
| **ESXi** | 7.0 U3g | 8.0 U3 | 9.0.0.0 |
| **vSAN** | 7.0 U3 | 8.0 U3 | 9.0 (ESA default) |
| **NSX** | 3.2.1 | 4.2.0 | 9.0.0.0 |
| **SDDC Manager** | 4.5.0.0 | 5.2.0.0 | 9.0.0.0 (now Fleet Management) |
| **Aria Suite Lifecycle** | 8.8.2+ | 8.18 | Replaced by Fleet Management |
| **Architecture** | vSphere 7 based | vSphere 8 based | vSphere 9, consolidated UI |

### Major Changes: 4.5 → 5.2

- **vSphere 8 Foundation**: Jump from vSphere 7 to vSphere 8 platform with ESXi 8.0 U3
- **NSX Upgrade**: NSX-T Data Center 3.2.x replaced with NSX 4.2.0
- **Flexible BOM**: New feature allowing administrators to customize component versions during upgrades
- **vSAN ESA Support**: Introduction of vSAN Express Storage Architecture alongside OSA
- **Aria Rebranding**: vRealize Suite fully rebranded to Aria Suite (Operations, Automation, Logs)
- **Asynchronous Patching**: Built-in console functionality for scheduling upgrades/patches
- **Tanzu Integration**: Enhanced vSphere Kubernetes Service (formerly TKG service)
- **HCX Inclusion**: HCX 4.10 included in standard BOM

### Major Changes: 5.2 → 9.0

- **Consolidated Management UI**: SDDC Manager interface merged into VCF Operations console under Fleet Management section
- **Mandatory Components**: VCF Operations, Fleet Management (formerly Aria Lifecycle), and VCF Automation now required—no longer optional
- **No Direct Aria Logs Upgrade**: Fresh install required for VCF Operations-Logs 9.0; can migrate 90 days of data from Aria Operations for Logs 8.x
- **Single NSX per vCenter**: Multi-NSX feature removed; only one NSX instance supported per vCenter
- **Enhanced Datapath Standard**: EDP replaces "Standard" as default virtual switch mode
- **Load Balancing Changes**: General purpose load balancing removed from VCF entitlement; Avi Load Balancer recommended
- **FIPS Default**: FIPS enabled by default for new deployments (preserved for upgrades)
- **VCF Installer**: New deployment model using VCF Installer and VCF Operations workflows instead of standalone OVA deployments
- **Licensing Changes**: vCenter instances operate in 90-day evaluation mode post-upgrade

### Deprecated/Removed Components Across Versions

| Component | Status in 9.0 |
|-----------|---------------|
| **vRealize Suite** | Fully replaced by VCF Operations/Automation |
| **NSXe** | Removed (deprecated in 4.x) |
| **Multi-NSX** | No longer supported |
| **NSX Migration Coordinator** | Removed; must migrate to NSX 4.x first |
| **Standalone NSX Install** | Not supported; must use VCF BOM |
| **VMware Identity Manager** | No upgrade path to VIDB; greenfield deployment required |
| **Aria Suite Lifecycle** | Replaced by VCF Fleet Management |
| **NSX Load Balancing** | Not included; Avi Load Balancer required |

### Upgrade Path Considerations

- **4.5 → 5.2**: Sequential or skip-level upgrade supported
- **5.2 → 9.0**: SDDC Manager upgrade first, then NSX, vCenter, ESXi
- **Mixed Environments**: VCF 9.0 management domain can manage 5.x workload domains
- **vSAN OSA**: Still supported in 9.0—not deprecated, allows continued use of existing hardware

### Sources

- [VMware Cloud Foundation 9.0 Release Notes](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/release-notes/vmware-cloud-foundation-90-release-notes.html)
- [VCF 5.2 to 9.0 Upgrade Top 10 Questions](https://blogs.vmware.com/cloud-foundation/2025/12/18/upgrading-vmware-cloud-foundation-5-2-to-9-0-the-top-10-questions-answered/)
- [What's New in VCF 9.0](https://blogs.vmware.com/cloud-foundation/2025/06/17/whats-new-in-vmware-cloud-foundation-9-0/)
- [VCF Version Correlation KB 52520](https://kb.vmware.com/s/article/52520)
- [VCF 9.0 Feature Comparison and Upgrade Paths](https://www.vmware.com/docs/vmware-cloud-foundation-9-0-feature-comparison-and-upgrade-paths)
- [VCF Update Sequence KB 390634](https://knowledge.broadcom.com/external/article/390634/update-sequence-for-vcf-90-and-compatibl.html)
