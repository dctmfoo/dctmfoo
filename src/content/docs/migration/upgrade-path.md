---
title: Upgrade Path (5.2 → 9.0)
description: Step-by-step upgrade process from VCF 5.2 to 9.0
---

## VCF 5.2 → 9.0 Upgrade Path

### Supported Upgrade Paths

**Direct upgrade to VCF 9.0 is supported from:**
- VCF 5.0 and later (sequential or skip-level)
- VCF 5.1.x
- VCF 5.2.x (recommended starting point)

**Indirect upgrade paths:**
- VCF 4.x environments must first upgrade to VCF 5.2, then proceed to 9.0
- Both management domain and all workload domains must reach 5.0+ before the 9.0 upgrade

**Minimum component versions required:**
- NSX: 4.0.x or later
- ESXi hosts: 8.0 or later
- Aria Suite Lifecycle: 8.18 Patch 2 (if deployed)

### Prerequisites

**Mandatory components in VCF 9.0:**
- VCF Operations (formerly Aria Operations) - now mandatory
- VCF Fleet Management (formerly Aria Suite Lifecycle) - now mandatory
- VCF Operations Collector - deployed during upgrade

**Identity management change:**
- No direct upgrade path from vIDM to VIDB (VCF Identity Broker)
- Greenfield VIDB deployment required post-upgrade

**Existing Aria Suite:**
- If deployed in "VCF aware mode," upgrade Aria components first
- No decoupling required before VCF core upgrade
- Aria Operations for Logs 8.x has no upgrade path - fresh install required for VCF Operations-Logs 9.0

**vSphere Lifecycle Manager (vLCM):**
- All ESXi clusters must convert from baseline management to vLCM images
- Baselines no longer supported in VCF 9.0

### Pre-Upgrade Checklist

1. **Backups**: Create backups of SDDC Manager, vCenter, NSX Manager, and all critical VMs
2. **Temporary IP addresses**: Reserve one temporary IP per vCenter Server
3. **Download bundles**: Obtain all upgrade bundles (offline depot if air-gapped)
4. **Certificate validity**: Verify all certificates are valid and not expiring during upgrade window
5. **Password validity**: Ensure no passwords expire during maintenance window
6. **vSAN HCL update**: Update vSAN hardware compatibility database
7. **Hardware compatibility**: Validate all hardware against VCF 9.0 compatibility list
8. **Firmware updates**: Update server firmware to supported versions
9. **Avi Load Balancer**: Upgrade to VCF 9-compatible release before NSX upgrade
10. **Third-party solutions**: Verify compatibility (backup software, monitoring tools)

### Upgrade Steps

**Phase 1: Prepare Environment**
1. Run SDDC Manager precheck (Workload Domains > Management Domain > Updates)
2. Resolve all precheck errors (warnings can be silenced if known false positives)
3. Take SDDC Manager VM snapshot
4. Ensure successful component backups

**Phase 2: Upgrade Management Components (if existing)**
1. Upgrade Aria Suite Lifecycle to 8.18 Patch 2
2. Upgrade Aria Operations to 8.18.x
3. Upgrade Aria Automation to 8.18.x (if deployed)

**Phase 3: Upgrade Core Components**
1. Navigate to Lifecycle Management > SDDC Manager
2. Select version 9.0, download, run precheck
3. Initiate SDDC Manager upgrade
4. Build upgrade plan (Plan Upgrade button)
5. Execute sequential component upgrades

### Component Upgrade Order

1. **SDDC Manager** - First component upgraded
2. **VCF Operations/Fleet Management** - Deployed if not present
3. **NSX Manager** - Network management plane
4. **vCenter Server** - Compute management plane
5. **ESXi Hosts** - Hypervisors (cluster by cluster)
6. **VCF Identity Broker (VIDB)** - Only after SDDC Manager, vCenter, and VCF Operations reach 9.0
7. **Additional components** - VCF Automation, VCF Operations for Networks, VCF Operations for Logs

**Note:** Workload domain upgrades are optional day-N procedures; management domain completes first.

### Post-Upgrade Tasks

1. **Deploy VIDB** - Configure single sign-on across all platform components
2. **Update vDS version** - Upgrade vSphere Distributed Switch
3. **Update vSAN on-disk format** - If using vSAN storage
4. **Verify VCF Operations** - Confirm monitoring and alerting operational
5. **Migrate to VCF Operations console** - SDDC Manager UI deprecated; use VCF Operations for lifecycle management
6. **Deploy VCF Operations-Logs** - Fresh installation with optional 90-day data migration from Aria Operations for Logs
7. **Validate third-party integrations** - Backup jobs, monitoring, automation scripts
8. **Documentation update** - Update runbooks to reflect new interfaces

### Rollback Options

**No single rollback mechanism exists.** Each component requires individual rollback:

1. **Checkpoint approach**: Treat each sequential upgrade as a checkpoint
2. **Pre-upgrade snapshots**: Take VM snapshots before each component upgrade
3. **Component-level rollback**: Revert specific failed component to pre-upgrade state
4. **Restore from backup**: Use file-based backups for SDDC Manager, vCenter, NSX

**Rollback limitations:**
- Once ESXi hosts upgraded, rollback is complex
- NSX configuration changes may not be reversible
- Data written post-upgrade may be lost

**Best practice:** Engage Broadcom Support immediately if issues arise during constrained maintenance windows.

### Sources

- [Upgrading Your VCF Management Domain to VMware Cloud Foundation 9.0](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/deployment/upgrading-cloud-foundation.html)
- [Upgrading VMware Cloud Foundation 5.2 to 9.0: Top 10 Questions Answered](https://blogs.vmware.com/cloud-foundation/2025/12/18/upgrading-vmware-cloud-foundation-5-2-to-9-0-the-top-10-questions-answered/)
- [How to Upgrade to VMware Cloud Foundation 9.0](https://blogs.vmware.com/cloud-foundation/2025/09/25/how-to-upgrade-to-vmware-cloud-foundation-9-0/)
- [Upgrading VMware Cloud Foundation 5.2 to 9.0: Webinar Takeaways](https://blogs.vmware.com/cloud-foundation/2025/11/20/upgrading-vmware-cloud-foundation-5-2-to-9-0-webinar-takeaways/)
- [Update Sequence for VCF 9.0 and Compatible Products](https://knowledge.broadcom.com/external/article/390634/update-sequence-for-vcf-90-and-compatibl.html)
- [VCF 9 Ultimate Upgrade Guide](https://blog.leaha.co.uk/2025/08/14/vcf-9-ultimate-upgrade-guide/)
- [Broadcom Product Interoperability Matrix](https://interopmatrix.broadcom.com/Interoperability)
