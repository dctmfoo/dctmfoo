---
title: SDDC Manager Changes
description: Critical changes to SDDC Manager in VCF 9 and functionality migration
---

## SDDC Manager Changes in VCF 9

### Overview

SDDC Manager continues to exist in VCF 9 but undergoes a significant transformation. The SDDC Manager UI is now **deprecated** and will be removed in a future release. Broadcom's strategy consolidates management into VCF Operations as the central console, delivering a more integrated platform with simplified management. SDDC Manager still runs as an appliance handling backend orchestration, but administrators interact primarily through VCF Operations and vSphere Client.

### What's Deprecated/Removed

**UI Deprecation:**
- SDDC Manager UI deprecated (removal planned for future major release)
- UI still accessible but many tasks require sync with VCF Operations

**API Changes:**
- SDDC Manager APIs for identity configuration deprecated
- Life cycle management API (`/v1/system/precheck`) removed
- Bring-up APIs replaced by VCF Installer appliance

**Feature Removals:**
- Application Virtual Network deployment via UI removed
- Deployment Parameter Worksheet (Excel EMS) replaced by VCF Installer JSON input
- Cloud Builder appliance replaced by VCF Installer appliance

### What's New

- **Broadcom Download Token Support:** SDDC Manager 9 supports Broadcom download tokens natively—no scripts needed
- **Bundles Renamed:** Software bundles now referred to as "binaries"
- **Backend Orchestration:** SDDC Manager continues handling workflow orchestration behind the scenes
- **NSX Segment Deployment:** New API functionality for deploying VCF Operations and VCF Automation on NSX Segments

### Functionality Migration

| Task | VCF 5.x (SDDC Manager) | VCF 9.0 (New Location) |
|------|------------------------|------------------------|
| Network Pool Management | SDDC Manager | vCenter |
| Host Commissioning | SDDC Manager | vCenter |
| Workload Domain Deployment | SDDC Manager GUI | VCF Operations |
| Cluster Creation/Expansion | SDDC Manager | vCenter |
| Backup Configuration | SDDC Manager | VCF Operations (Fleet Management) |
| DNS/NTP Configuration | SDDC Manager | VCF Operations |
| Certificate Authority Setup | SDDC Manager | VCF Operations |
| Certificate Management | SDDC Manager | VCF Operations (with auto-renewal) |
| Password Management | SDDC Manager | VCF Operations |
| Aria Suite Deployment | SDDC Manager UI/API | VCF Installer + VCF Operations |

### Impact on Operations

**Day-2 Workflow Changes:**
- Workload domain creation moves exclusively to VCF Operations
- Host and cluster management now performed through vSphere Client/vCenter
- Certificate operations gain auto-renewal capability in VCF Operations
- Fleet Management in VCF Operations handles backups for Management Nodes, VCF Automation, and VCF Identity Broker

**New Skills Required:**
- VCF Operations console navigation and workflows
- Understanding task sync behavior between SDDC Manager and VCF Operations
- VCF Installer appliance for initial deployments (replaces Cloud Builder)
- JSON-based deployment specifications instead of Excel worksheets

**Transitional Considerations:**
- Some SDDC Manager UI actions don't immediately reflect in VCF Operations (dependent on sync schedules)
- Upgrade path: First upgrade Management Domain via SDDC Manager, then import VCF Instance into VCF Operations
- Previous tight coupling of admin tasks to SDDC Manager is removed, providing more flexibility

### Sources

- [SDDC Manager Workflows in VMware Cloud Foundation 9.0 - Broadcom TechDocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/building-your-private-cloud-infrastructure/sddc-manager-workflows.html)
- [VMware Cloud Foundation 9.0: Transitioning from SDDC Manager to VCF Operations – My Cloudy World](https://my-cloudy-world.com/2025/07/03/vmware-cloud-foundation-9-0-transitioning-from-sddc-manager-to-vcf-operations/)
- [Deprecated and removed features in VCF 9.0 - vInfrastructure Blog](https://vinfrastructure.it/2025/06/deprecated-features-in-vcf-9-0/)
- [10 VMware Cloud Foundation 9.0 Enhancements: Simplifying Your Day 2 Operations - VMware Blog](https://blogs.vmware.com/cloud-foundation/2025/09/18/10-vmware-cloud-foundation-9-enhancements-simplifying-your-day-2-operations/)
- [Creating Workload Domains in VMware Cloud Foundation 9 - ViquarCloud](https://www.viquarcloud.com/post/creating-workload-domains-in-vmware-cloud-foundation-9-a-shift-from-sddc-manager-to-vcf-operations)
- [VCF 9 Product Support Notes - Broadcom TechDocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/release-notes/vmware-cloud-foundation-90-release-notes/platform-product-support-notes.html)
