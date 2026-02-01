---
title: Management Domain Deployment
description: Deploying the VCF 9 Management Domain
---

## VCF 9 Management Domain Deployment

### Management Domain Components

The management domain hosts all core VCF management infrastructure:

- **SDDC Manager** - Central lifecycle and configuration management (being deprecated in future releases)
- **vCenter Server** - Virtual infrastructure management
- **NSX Manager** - Network virtualization (single or 3-node cluster for HA)
- **VCF Operations** - Day 2 operations and monitoring (MANDATORY in VCF 9)
- **VCF Operations Fleet Management** - Lifecycle management for Aria components
- **VCF Operations Collector** - Data collection for monitoring
- **VCF Automation** - Infrastructure automation (MANDATORY in VCF 9)
- **VCF Identity Broker (VIDB)** - New identity management component in VCF 9

**Deployment Models:**
- Simple Model: Minimum 7 appliances (single instance of each component)
- High Availability Model: Minimum 13 appliances (3x NSX Manager, 3x VCF Operations nodes)

### Deployment Prerequisites

**Infrastructure Requirements:**
- DNS: Forward and reverse records for all FQDNs (critical - many failures due to missing records)
- NTP: Time synchronization server accessible by all components
- Licensing: 90-day evaluation mode, license required within first 90 days

**Network VLANs/Subnets Required:**
- Management VLAN - Core management components
- VM Management VLAN - Tenant/VM workloads
- vMotion VLAN - VM mobility between hosts
- vSAN VLAN - Storage traffic (if using vSAN)
- Host TEPs VLAN - NSX Tunnel Endpoints

**Software Requirements:**
- Download deployment binaries from Broadcom (vCenter, ESXi, NSX, SDDC Manager)
- VCF Installer appliance deployed and powered on
- VCF Planning and Preparation Workbook completed

### Deployment Steps

**1. Deploy VCF Installer Appliance**
- Replaces Cloud Builder from previous versions
- UI-driven workflow (no Excel workbook required)

**2. Download Required Binaries**
- Use VCF Installer UI to download vCenter, ESXi, NSX, SDDC Manager components

**3. Configure Deployment Parameters**
- Network settings, credentials, storage configuration
- Select deployment model (Simple or HA)

**4. Initiate Management Domain Bring-up**
- VCF Installer deploys all management components automatically
- Deploys ESXi hosts, vCenter, NSX, SDDC Manager
- Deploys VCF Operations and VCF Automation (mandatory)

**5. VCF Operations Role (NEW in VCF 9)**
- SDDC Manager UI being deprecated
- Workload domain creation now done through VCF Operations
- Day 2 operations shifted to vCenter and VCF Operations

### Post-Deployment Validation

**Health Check Commands:**
```
ssh vcf@sddc-manager
su -
cd /opt/vmware/sddc-support
./sos --health-check --domain-name ALL --skip-cert-check
```

**Verification Checklist:**
- Verify all management VMs powered on and healthy
- Check vCenter connectivity and cluster status
- Validate NSX Manager cluster formation
- Confirm VCF Operations data collection working
- Test VCF Automation login and node health
- Verify DNS resolution for all components
- Check NTP synchronization across all hosts

**Recommended Testing:**
- Performance benchmarking
- Failover scenarios for HA components
- Storage reliability tests
- Network connectivity validation
- Full disaster recovery drills

### Sizing Recommendations

**Minimum Host Requirements:**
- vSAN Storage: 3 ESXi hosts minimum (4 recommended for production)
- External Storage (NFS/FC): 2 ESXi hosts minimum

**Host Resource Guidelines:**
- CPU: Size by physical cores, not logical cores (SMT does not equal 2x performance)
- CPU overcommit ratio: Keep vCPU:pCPU at 2:1 or less
- Memory: 32 GB minimum per host for vSAN disk groups
- Memory: ~72 GB RAM per host for lab/nested deployments
- Admission control: Set to N+1 for failover capacity

**VCF Automation Requirements:**
- Initial: 24 vCPUs, 96 GB RAM
- Post-deployment: Can reduce to 16 vCPUs (RAM must stay at 96 GB)
- Small form factor: 1 VIP + 2 cluster node IPs

**Storage Options:**
- vSAN OSA/ESA (minimum 3 hosts)
- NFS (minimum 2 hosts)
- Fibre Channel VMFS (minimum 2 hosts)

### Sources

- [Planning a Successful VCF 9.0 Deployment](https://blogs.vmware.com/cloud-foundation/2025/07/28/planning-a-successful-vmware-cloud-foundation-9-0-deployment/)
- [VCF 9 Deployment Pathways](https://blogs.vmware.com/cloud-foundation/2025/07/03/vcf-9-0-deployment-pathways/)
- [Management Domain Model](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/design/design-library/workload-domain-deployment-models/management-domain-deployment-model.html)
- [Managing VCF Domains](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/building-your-private-cloud-infrastructure/working-with-workload-domains.html)
- [VCF 9 External Requirements](https://www.viquarcloud.com/post/vmware-cloud-foundation-9-external-requirements-for-a-greenfield-deployment)
- [VCF 9 Deployment Best Practices](https://puneetsharma.blog/2025/07/22/vcf-9-deployment-best-practices-avoiding-common-pitfalls-for-a-smooth-private-cloud-journey/)
- [VCF 9 Installer Walkthrough](https://vxworld.co.uk/2025/06/29/vmware-cloud-foundation-9-vcf-installer-walkthrough/)
- [SDDC Manager Health Check](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-5-2-and-earlier/5-2/vcf-instance-recovery-5-2/verifications-and-remediations/check-sddc-manager-health.html)
