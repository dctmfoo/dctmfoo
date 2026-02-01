---
title: Migration Gotchas
description: Common issues and lessons learned during VCF 9 migration
---

## VCF 9 Migration Gotchas & Lessons Learned

### Pre-Migration Pitfalls

**Licensing Changes**: VCF 9 eliminates traditional license keys. Products must be licensed via VCF Operations and vCenter. VMware1! passwords no longer work—admin passwords must meet new complexity requirements or onboarding fails.

**Mandatory Components**: VCF Operations (formerly Aria Operations), VCF Operations Fleet Management (Aria Suite Lifecycle), and VCF Automation (Aria Automation) are now mandatory. Plan to install these if not already present.

**Version Prerequisites**: Aria Automation and Aria Operations must be on version 8.18 before upgrading to VCF 9.0. Multiple sequential upgrades may be required from older versions.

**Cluster Image Migration**: Clusters using baselines must be migrated to cluster images before starting the upgrade.

**VCF Automation NSX Mode**: NSX clusters must be in Policy Mode. Manager Mode breaks the upgrade.

**vSphere Version Requirement**: Converting existing vSphere environments requires vSphere 8.0 Update 1 or later and removal of Enhanced Linked Mode (ELM).

### During Migration Issues

**vCenter Upgrade Failures**: Upgrading from vCenter 8.0 Update 3+ to 9.0 may fail with "Failed to get sso server certificate for validation." Reduced Downtime Upgrade (RDU) fails at switchover if file-based backup/restore was run before migration.

**NSX Download Issues**: download.vmware.com is no longer available. NSX release notifications and automatic binary downloads are unavailable. Pre-upgrade check bundles won't download automatically.

**VCF Operations Network Adapter Issues**: Custom network adapters don't start after upgrading VCF Operations. VCF Operations for Networks upgrade may fail with errors.

**VCF Automation Disk Issues**: Upgrade from Aria Automation 8.18 to VCF Automation 9.0 can fail due to disk dismount issues.

**Orchestrator Authentication**: If using vSphere authentication with special characters (spaces in domain names), the re-registration command fails during upgrade.

### Post-Migration Surprises

**No Aria Operations for Logs Migration Path**: There is no import/upgrade path for Log Insight. Deploy a new VCF Operations Logs instance, redirect all log sources, and use VCF Operations Log Data Transfer to migrate up to 90 days of existing logs.

**vSAN Adapter Warnings**: After workload domain redeployment, the vCenter/vSAN adapter may enter Warning state.

**VMware Cloud Director Incompatibility**: VCD is not supported with VCF 9.0, with no official migration paths available.

**Isolated Domain Limitations**: If isolated workload domains haven't been upgraded to 9.0, you cannot add hosts or clusters via vSphere UI.

### Community Reported Issues

**IP Conflicts**: VCF Operations Collector deployment fails if SDDC Manager IP conflicts with another device. Requires full cleanup and redeployment.

**NSX Image Validation**: "NSX_T_MANAGER install image not found" error with VCF Installer 9.0.1—requires workaround before deployment starts.

**vSAN ESA Disk Problems**: Avoid using create_custom_vsan_esa_hcl_json.ps1 script—causes "No storage pool eligible disks found" errors during vCenter deployment. Use the vSAN ESA HCL mock VIB method instead.

**NFS MTU Issues**: Configure correct MTU (9000) on vSwitch and VMKernel port before deployment for NFS success.

**Session Timeout During Deployment**: 401 UNAUTHORIZED errors occur if session times out during deployment. Keep UI active and don't log out during deployments.

### Troubleshooting Tips

**Primary Log Location**: `/var/log/vmware/vcf/domainmanager/domainmanager.log`—tail in real-time during deployment.

**Retry Mechanism**: Use VCF Installer UI "Retry and Proceed with Deployment" button for recoverable errors like DNS timeouts or vSAN disk claiming failures.

**Manual Intervention Points**: Log into vCenter to manually claim unused disks for vSAN ESA datastore. Log into NSX Manager to resolve registration failures.

**Certificate Regeneration**: For 9.0 deployments, regenerate vCenter certificate with IP in SAN. For 8.x upgrades, regenerate both vCenter and NSX certificates, then re-validate cloud accounts.

**No Easy Rollback**: No single rollback for entire VCF. Assess failures at component level and rollback to pre-failure state or contact support.

### Sources

- [VCF Operations Migration](https://sdn-warrior.org/posts/vcf-operations-migration/)
- [VCF 9 Deployment Best Practices](https://puneetsharma.blog/2025/07/22/vcf-9-deployment-best-practices-avoiding-common-pitfalls-for-a-smooth-private-cloud-journey/)
- [VCF 9 Ultimate Upgrade Guide](https://blog.leaha.co.uk/2025/08/14/vcf-9-ultimate-upgrade-guide/)
- [Upgrading VCF 5.2 to 9.0 Top 10 Questions](https://blogs.vmware.com/cloud-foundation/2025/12/18/upgrading-vmware-cloud-foundation-5-2-to-9-0-the-top-10-questions-answered/)
- [VCF 9 Installation Troubleshooting](https://www.viquarcloud.com/post/vmware-cloud-foundation-9-installation-troubleshooting-know-where-to-look)
- [VCF Operations Collector Deployment Failure](https://knowledge.broadcom.com/external/article/421038/)
- [VCF 9 Deployment Experience](https://make-it-work.net/2025/07/vcf-9-deployment-experience/)
- [VCF Fleet Deployment Task Fails](https://www.lab2prod.com.au/2025/10/vcf-9-fleet-deployment-task-fails.html)
