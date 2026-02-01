---
title: Dell PowerEdge Servers
description: Dell server compatibility, BIOS settings, firmware, and drivers for VCF 9
---

## Dell PowerEdge Server Compatibility for VCF 9

### Certified Server Models

Dell has 48+ servers certified for vSphere 8.0 with 300+ configurations, and dedicated firmware catalogs for ESXi 9.x (VCF 9). The Broadcom Compatibility Guide (BCG) is the authoritative source for current certifications.

| Model | Generation | CPU Support | Use Case |
|-------|------------|-------------|----------|
| R760 | 16th Gen | Intel Xeon 4th/5th Gen Scalable | vSAN ESA Ready Node, Workload Domain |
| R760XA | 16th Gen | Intel Xeon 4th/5th Gen Scalable | GPU-accelerated workloads |
| R660 | 16th Gen | Intel Xeon 4th/5th Gen Scalable | vSAN ESA Ready Node, Management Domain |
| R6615 | 16th Gen | AMD EPYC 9004 (Genoa) | Single-socket vSAN Ready Node |
| R7615 | 16th Gen | AMD EPYC 9004 (Genoa) | Single-socket high-capacity |
| R7625 | 16th Gen | AMD EPYC 9004 (Genoa) | Dual-socket vSAN ESA Ready Node |
| R670 | 17th Gen | Intel Xeon 5th/6th Gen | Latest Intel platform |
| R6715 | 17th Gen | AMD EPYC 9005 (Turin) | Latest AMD single-socket |
| R770 | 17th Gen | Intel Xeon 5th/6th Gen | Latest Intel high-capacity |
| R7715 | 17th Gen | AMD EPYC 9005 (Turin) | Latest AMD single-socket capacity |
| R7725 | 17th Gen | AMD EPYC 9005 (Turin) | Latest AMD dual-socket |
| MX760c | 16th Gen | Intel Xeon 4th/5th Gen | Modular chassis compute sled |

### Recommended Configurations

**Management Domain Hosts**
- Minimum 4 hosts for vSAN ESA
- R660 or R6615 recommended for smaller footprint
- 512GB-1TB RAM per host typical
- NVMe-only storage for vSAN ESA

**Workload Domain Hosts**
- R760, R7625, or R770 for compute-intensive workloads
- Scale based on workload requirements
- Consider R760XA for AI/ML with GPU acceleration

**vSAN Ready Nodes**
- Pre-configured, tested, and certified by Dell and Broadcom
- Profiles: HY-2, HY-4, HY-6, HY-8 (hybrid), AF-6, AF-8 (all-flash)
- vSAN ESA requires NVMe storage controllers and drives listed on BCG

### BIOS Requirements

**Minimum BIOS Versions (16th Gen - Check Dell KB000355982)**
- R760/R660: BIOS 2.x or later (verify exact version with Dell firmware catalog)
- AMD platforms: AGESA 1.0.0.G interface specification

**Key BIOS Settings**
- Virtualization Technology (VT-x/AMD-V): Enabled
- VT-d/AMD-Vi (IOMMU): Enabled
- SR-IOV: Enabled (if using network virtualization offload)
- Memory Operating Mode: Optimizer Mode
- Power Profile: Performance
- Boot Mode: UEFI
- Secure Boot: Can be enabled (ESXi 9 supports it)

### Firmware Bundle

**Dell vSAN Firmware Catalog**
- ESXi 9.x dedicated catalog available at Dell Support (KB000337386)
- ESXi 8.x catalog available separately (KB000183111)
- Includes validated firmware for BIOS, iDRAC, NIC, storage controllers, drives

**iDRAC9 Firmware Requirements**
- 16th Gen: iDRAC9 firmware 7.x recommended
- Security updates: DSA-2025-350, DSA-2025-351, DSA-2025-352, DSA-2026-004
- Enable Lifecycle Controller for firmware management

**NIC Firmware**
- Intel X710/E810: Check VMware HCL for specific firmware versions
- Broadcom BCM57xxx: Verify compatibility with ESXi 9 drivers
- Mellanox ConnectX-6/7: Supported with appropriate firmware

### Driver Versions

**Dell OpenManage Enterprise Integration for VMware vCenter (OMEVV)**
- Acts as Hardware Support Manager (HSM) for vSphere Lifecycle Manager (vLCM)
- Provides firmware and driver add-on bundles
- Requires OME Advance+ license for full functionality
- Version 1.3 or later recommended for VCF 9

**Key Driver Sources**
- Dell Customized ESXi 9.x Image: Available from Dell Support
- VMware HCL: Verify I/O device compatibility at compatibilityguide.broadcom.com
- Dell Repository Manager: Create platform-specific bootable ISOs

**vLCM Integration**
- OMEVV presents Hardware Support Packages (HSP) to vCenter
- Single remediation operation handles firmware, drivers, and ESXi updates
- Compliance monitoring against BCG and vSAN compatibility guide

### Dell VxRail vs. Custom PowerEdge for VCF 9

| Aspect | VxRail | Custom PowerEdge |
|--------|--------|------------------|
| Integration | Fully integrated, pre-tested | Manual configuration required |
| Lifecycle Management | Automated full-stack updates | Separate firmware/driver management |
| Pre-check Validation | Built-in before upgrades | Manual verification needed |
| Time to Deploy | Faster, turnkey | More planning required |
| Flexibility | Fixed configurations | Full customization |
| Support Model | Single vendor (Dell) | Split support possible |
| VCF Updates | Coordinated with VxRail bundles | Independent update cycles |
| Upgrade Time | 1.5-2 hours per host | Varies based on approach |

**VxRail Series Based on PowerEdge**
- V Series: PowerEdge R660/R760 based
- E Series: PowerEdge R6615/R6625/R7615/R7625 based
- P Series: High-performance configurations

### VCF 9 Specific Considerations

**vSAN ESA HCL Validation**
- VCF 9 Installer performs pre-validation using offline HCL JSON
- Error: "No vSAN ESA certified disks found" if database >90 days old
- Solution: Update /nfs/vmware/vcf/nfs-mount/vsan-hcl/all.json from https://vvs.broadcom.com/service/vsan/all.json
- VCF 9.0.1: Added bypass option in installer UI

**ESXi 9 License Assignment**
- After VCF 9 upgrade, assign vSphere licenses through VCF Operations
- Includes vCenter, vSAN, and ESXi licenses

### Sources

- [Dell PowerEdge Servers Certified for vSphere 8.0](https://www.dell.com/support/kbdoc/en-us/000217592/dell-poweredge-servers-certified-for-vmware-vsphere-8-0)
- [Dell vSAN Ready Nodes Firmware Catalog (ESXi 9.x)](https://www.dell.com/support/kbdoc/en-us/000337386/firmware-catalog-for-dell-s-vsan-ready-nodes-with-esxi-9-x-branch-images)
- [Dell vSAN Ready Nodes Firmware Catalog (General)](https://www.dell.com/support/kbdoc/en-us/000183111/firmware-catalog-for-dell-emc-s-vsan-ready-nodes)
- [Broadcom Compatibility Guide - vSAN ESA](https://compatibilityguide.broadcom.com/search?program=vsanesa&persona=live)
- [Broadcom Compatibility Guide - Dell vSAN ReadyNodes](https://compatibilityguide.broadcom.com/search?program=vsanosa&persona=live&vsanReadynodeVendors=%5BDell%5D)
- [OpenManage Enterprise Integration for VMware vCenter](https://www.dell.com/support/kbdoc/en-us/000176981/openmanage-integration-for-vmware-vcenter)
- [PowerEdge 16th Gen BIOS/iDRAC Upgrades](https://www.dell.com/support/kbdoc/en-uk/000355982/poweredge-recommends-upgrading-bios-and-idrac9-for-16th-gen)
- [vSAN ESA HCL Workaround for VCF 9.0](https://williamlam.com/2025/06/vsan-esa-disk-hcl-workaround-for-vcf-9-0.html)
- [Firmware Lifecycle with vSphere Lifecycle Manager](https://blogs.vmware.com/cloud-foundation/2024/11/07/firmware-lifecycle-made-simple-with-vsphere-lifecycle-manager/)
- [Verifying VCF vSAN Compatibility](https://blogs.vmware.com/cloud-foundation/2024/11/20/verifying-compatibility-for-vmware-cloud-foundation-environments-powered-by-vsan/)
- [VxRail Models to PowerEdge Models](https://www.dell.com/support/kbdoc/en-us/000023374/vxrail-models-to-dell-poweredge-models)
- [VCF on VxRail Upgrade Information](https://www.dell.com/support/kbdoc/en-us/000021470/vmware-cloud-on-dell-vxrail-vcf-on-vxrail-upgrade-information)
