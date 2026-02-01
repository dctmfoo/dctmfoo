---
title: Lifecycle Management
description: VCF 9 lifecycle management and upgrade sequences
---

## VCF 9 Lifecycle Management

### LCM Architecture in VCF 9

VCF 9 introduces a fundamentally redesigned lifecycle management architecture centered on VCF Operations and a new Fleet Management Appliance. The Fleet Management Appliance is a new component that orchestrates and coordinates the lifecycle of all management components—it must always be upgraded first before other management components.

VCF Operations serves as the central tool for managing the lifecycle of both Management and Core Infrastructure Components. It provides unified capabilities for downloading, staging, and applying patches or upgrades whether operating online or through an offline depot. The previous SDDC Manager-centric LCM workflow has been augmented with this new layered approach.

Key architectural changes:
- Fleet Management Appliance as the central orchestrator
- VCF Operations as the primary lifecycle management interface
- Patch Planner replaces previous update mechanisms
- Binary management consolidated under Fleet Management → Lifecycle

### Update Bundle Process

Update bundles in VCF 9 are downloaded through either an online depot or offline depot. For online environments, binaries are automatically available in the Patch Planner. For offline environments, the VCF Download Tool downloads upgrade bundles and ESX components to the offline depot.

The patching workflow operates through VCF Operations:
1. Navigate to Fleet Management → Lifecycle → VCF Instances
2. Run Precheck to validate upgrade readiness
3. Plan Patching to select components and target versions
4. Validate Selection (UI indicates RDU-compatible versions)
5. Review update sequence and confirm
6. Execute via Schedule Update or Update Now

Important constraint: Patching plans cannot coexist with upgrade plans—existing upgrade plans must be cancelled before creating patching plans.

### Async Patching

Async releases allow applying critical patches to VCF components (NSX Manager, vCenter Server, ESXi) outside of regular VCF releases. These are essential for addressing urgent security vulnerabilities or critical bugs between major releases.

Starting with VCF 5.2 (and continuing in 9.0), async patches can be downloaded via SDDC Manager UI or Bundle Transfer Utility—the Async Patch Tool is only required for VCF 5.1 and earlier. VCF 9.0.1.0 introduced selective component patching, allowing administrators to apply patches only to affected components rather than requiring full stack updates.

March 2025 brought changes to VMware Depot URL and authentication methods—environments must be updated to access the new URL using new authentication credentials.

### vLCM Integration

VCF 9 mandates transition from vLCM baseline management to vLCM image management for all clusters. This is a hard prerequisite for the ESX upgrade portion of VCF 9.x upgrades.

ESXi Image Creation process has been streamlined:
- Previously required creating a dummy cluster to compose ESX images
- Now accomplished directly in vCenter via Lifecycle Manager → Image Library → Create Image
- Images are then imported to SDDC Manager and assigned to target clusters

For heterogeneous hardware environments, PowerShell scripts enable temporary VUM access to facilitate transition to vLCM images. Following VUM-based ESX 9 upgrades, clusters should prioritize transitioning to vLCM image management.

### Upgrade Sequence

The complete VCF 9.0 upgrade sequence follows a strict order:

| Sequence | Component |
|----------|-----------|
| 0 | VCF Download Tool |
| 1 | VMware Aria Suite Lifecycle (Patch 8.18.2 required) |
| 2 | VCF Operations + Fleet Management Appliance |
| 3 | VCF Automation |
| 4-5 | VCF Operations for Networks, Logs |
| 6-9 | VADP Backup, vSphere Replication, SRM, AVI |
| 10 | SDDC Manager |
| 11-12 | HCX, NSX |
| 13 | vCenter |
| 14 | VCF Identity Broker (new in 9.0) |
| 15 | Supervisor, vSAN Witness Host |
| 16 | ESXi |
| 17-19 | NSX Finalize, VMware Tools, Virtual Hardware/vSAN |

Critical notes:
- Patches can be applied in any order; upgrade sequence only matters for major/minor releases
- VMware Aria Operations for Logs has no upgrade path from 8.x—requires fresh installation
- VCF Identity Broker only installable after VCF Operations, SDDC Manager, and vCenter reach 9.0

### Sources

- [Broadcom TechDocs - Patching Management and Workload Domains](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/lifecycle-management/lifecycle-management-of-vcf-core-components/patching-the-management-and-workload-domains.html)
- [Update Sequence for VCF 9.0](https://knowledge.broadcom.com/external/article/390634/update-sequence-for-vcf-90-and-compatibl.html)
- [VCF 9.0 Async Releases](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/release-notes/vmware-cloud-foundation-async-releases.html)
- [VCF 9.0.1.0 Release Notes](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/release-notes/vmware-cloud-foundation-9-0-1-release-notes.html)
- [VMware Blog - How to Upgrade to VCF 9.0](https://blogs.vmware.com/cloud-foundation/2025/09/25/how-to-upgrade-to-vmware-cloud-foundation-9-0/)
- [VCF 9 Ultimate Upgrade Guide](https://blog.leaha.co.uk/2025/08/14/vcf-9-ultimate-upgrade-guide/)
