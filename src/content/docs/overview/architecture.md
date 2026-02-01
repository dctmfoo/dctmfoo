---
title: Architecture Overview
description: VCF 9 architecture, components, and key changes from previous versions
---

VMware Cloud Foundation 9.0 introduces a three-layer hierarchical architecture: Private Cloud > Fleet > Instance. Released June 17, 2025, VCF 9 aligns all components (vSphere, NSX, vSAN, SDDC Manager) to version 9.x for unified versioning. The platform integrates compute, networking, storage, and automation into a single framework supporting VMs, containers, and Kubernetes workloads.

## Core Components & Versions

| Component | Version | Notes |
|-----------|---------|-------|
| VMware ESXi | 9.0.0.0 | Build 24755229 |
| VMware vCenter | 9.0.0.0 | Build 24755230 |
| VMware NSX | 9.0.0.0 | Build 24733065; auto-installed |
| SDDC Manager | 9.0.0.0 | Build 24703748 |
| vSAN ESA Witness | 9.0.0.0 | Build 24755427 |
| vSAN OSA Witness | 9.0.0.0 | Build 24755428 |
| VCF Operations | 9.0.0.0 | Replaces Aria Operations |
| VCF Automation | 9.0.0.0 | Replaces Aria Automation |
| VCF Identity Broker | 9.0.0.0 | New in VCF 9 |
| VCF Installer | 9.0.2.0 | Required for deployment |

## Key Changes from Previous Versions

- **VCF Fleet**: New abstraction for centralized management of multiple VCF Instances across data centers
- **Three-layer hierarchy**: Private Cloud (top) > Fleet > Instance structure
- **NSX mandatory installation**: Auto-installed for VPC-readiness (usage optional)
- **vSAN no longer required** for Management Domain
- **FIPS 140-2/140-3 enabled by default**: Cannot be deactivated
- **90-day evaluation period** (extended from 60 days)
- **Unified versioning**: All components aligned to version 9.x

## New Features

- **Virtual Private Clouds (VPCs)**: Self-service isolated networks integrated with vCenter
- **VCF Identity Broker (VIDB)**: Unified authentication across the stack
- **VCF Operations**: New unified Operate Experience with fleet-wide license management
- **Advanced NVMe Memory Tiering**: Uses NVMe as lower-cost memory tier
- **vSAN ESA enhancements**: End-to-end NVMe, global dedup/compression, HCI Mesh sharing
- **Enhanced cost visibility**: TCO dashboards with chargeback/showback capabilities
- **Data sovereignty controls**: Geo-fencing policies, data-residency tags
- **Kubernetes integration**: Native container/VM co-existence with Argo CD support

## Deprecated/Removed

- **vSphere vVols**: Deprecated in 9.0, removal planned for 9.1
- **vSAN Hybrid OSA**: Deprecated (all-flash OSA still supported)
- **vCenter Enhanced Linked Mode (ELM)**: No longer used
- **SDDC Manager UI**: Deprecated, future removal planned
- **Aria Operations for Logs**: Deprecated; 8.18 is final version
- **Auto-Deploy Stateless (PXE boot)**: Deprecated
- **Standard Virtual Switch mode**: Replaced by Enhanced Datapath (EDP) Standard
- **vLCM Baselines**: Removed; image-based configuration only
- **N-VDS on ESXi**: Removed; NSX uses native VDS 7.0+ only

## Sources

- [VCF 9.0 Release Notes](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/release-notes/vmware-cloud-foundation-90-release-notes.html)
- [VCF 9.0 Bill of Materials](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/release-notes/vmware-cloud-foundation-90-release-notes/vmware-cloud-foundation-bill-of-materials.html)
- [What's New in VCF 9.0](https://blogs.vmware.com/cloud-foundation/2025/06/17/whats-new-in-vmware-cloud-foundation-9-0/)
- [VCF 9 Technical Overview](https://blogs.vmware.com/cloud-foundation/2025/08/12/vmware-cloud-foundation-9-technical-overview/)
- [VCF 9 Deprecated Features](https://vinfrastructure.it/2025/06/deprecated-features-in-vcf-9-0/)
- [VCF/VVF 9 Deprecation Notices](https://vninja.net/2025/06/18/vcf9-deprecation-notices/)
