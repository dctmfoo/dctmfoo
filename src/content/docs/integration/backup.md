---
title: Backup Integration
description: Backup solutions and SDDC Manager backup configuration
---

## Backup Integration for VCF 9

### Supported Backup Solutions

**Veeam Backup & Replication v13**
- New appliance-based deployment (OVA) eliminates Windows OS dependency
- Deploy directly to VCF 9 environment on vSAN principal storage
- Configure via vCenter FQDN using vsphere.local service account
- Supports VMware NSX-T 3.0+ with VDS for VMware vSphere

**Dell PowerProtect**
- Integration with Veeam Availability Suite for Dell storage customers
- Reduces RPO/RTO through technology integration
- Supports VMware Cloud on AWS/Dell deployments

**Commvault**
- Data Import app can import Veeam backup jobs (Professional Services engagement required)
- No direct VCF 9 native integration documented
- Migration path: restore Commvault backups as VMs, then reprotect with target solution

**Native vSAN Data Protection**
- Included in VCF license (no additional cost)
- Requires vSAN ESA in VCF environment
- Local snapshot-based protection with immutability options

### VCF Management Backup

**SDDC Manager Backup (VCF 9.0)**
- SDDC Manager UI deprecated; use VCF Operations or vSphere Client
- File-based daily backups via SFTP server
- Access: VCF Operations → Fleet Management → Lifecycle → Settings → Backup Settings
- Default schedule: Daily at 04:02 AM plus after each state change
- Coordinate backup jobs within 5-minute window across SDDC Manager and vCenter instances

**Additional Components**
- Fleet Manager, Identity Broker, and Automation: Configure under Fleet Management → Lifecycle → Settings
- NSX Manager: File-based backup coordination required
- Management Node: Restore available via Fleet Management → Lifecycle → Settings → Management Node Backup

**Restore Process**
- Deploy fresh SDDC Manager appliance
- SSH as vcf user, switch to root
- Edit restore_status.json and obtain authentication token
- Validate with: `sudo /opt/vmware/sddc-support/sos --health-check`

### VM/Workload Backup

**vSAN Data Protection**
- Protection groups define VM protection outcomes
- Control frequency and retention schedules
- Immutability via checkbox (protects against malicious activities)
- Up to 200 snapshots per VM

**vSAN-to-vSAN Replication (New in VCF 9.0)**
- Cross-cluster replication for disaster recovery
- RPOs as low as 1 minute with deep snapshots
- Near-instantaneous recovery capabilities
- Single VMware Live Recovery appliance manages lifecycle

**VMware Live Recovery**
- Integrates tightly with vSAN for differentiated benefits
- Full DR orchestration with automated recovery
- On-premises cyber recovery for data sovereignty compliance
- VMware Validated Solution for isolated clean room operations

### Best Practices

1. **Configure backups immediately after deployment** - First administrative task priority
2. **Monitor SFTP storage utilization** - Ensure capacity for retention period
3. **Coordinate backup windows** - All management components within 5-minute window
4. **Enable immutability** - Foundation for cyber resilience against ransomware
5. **Leverage native vSAN Data Protection** - Already licensed, no additional cost
6. **Single appliance strategy** - VCF 9.0 consolidates protection into one appliance
7. **Test restore procedures** - Validate health checks return green status

### Sources

- [Veeam 13 Backup Appliance + VCF 9 Integration](https://www.virtualbytes.io/veeam-13-backup-appliance-vcf-9-integration/)
- [How VCF 9.0 Architecture Works - Veeam Community](https://community.veeam.com/blogs-and-podcasts-57/how-vcf-9-0-architecture-works-a-practical-guide-10776)
- [vSAN Data Protection in VMware Cloud Foundation](https://blogs.vmware.com/cloud-foundation/2025/11/04/vsan-data-protection-in-vmware-cloud-foundation-the-solution-you-already-own/)
- [VMware Live Recovery VCF 9.0](https://blogs.vmware.com/cloud-foundation/2025/06/17/vmware-live-recovery-vcf-9-0/)
- [Back Up SDDC Manager - Broadcom TechDocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/fleet-management/backup-and-restore-of-cloud-foundation/file-based-backups-for-sddc-manager-and-vcenter-server/back-up-sddc-manager.html)
- [File-Based Backups for SDDC Manager - Broadcom TechDocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/fleet-management/backup-and-restore-of-cloud-foundation/file-based-backups-for-sddc-manager-and-vcenter-server.html)
- [VCF 9 Backup Configuration Essentials](https://configmgr.nl/vmware/safeguarding-your-vcf-9-deployment-backup-configuration-essentials/)
- [Dell EMC Storage Backup - Veeam](https://www.veeam.com/solutions/alliance-partner/dell.html)
