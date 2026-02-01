---
title: NSX Networking Requirements
description: NSX requirements and changes in VCF 9
---

## NSX Requirements for VCF 9

### NSX Version

- **Included Version**: NSX 9.0 (based on NSX 4.x codebase) ships with VCF 9.0
- **Auto-Installation**: NSX installs automatically with every workload domain deployment
- **Mandatory Install, Optional Use**: NSX is required infrastructure but using virtual networking features remains optional—VLAN-backed port groups continue to work
- **Licensing**: NSX uses VCF license assigned to vCenter; 90-day evaluation mode available until licensed
- **Standalone Not Supported**: Starting VCF 9.0, standalone NSX upgrade or fresh installation is not supported—must use VCF BOM and lifecycle management

### Architecture Changes

- **Single NSX per vCenter**: Multi-NSX feature is not supported in VCF 9.0
- **Pre-Upgrade Requirement**: Before upgrading, switch off multi-NSX feature or map each NSX Manager instance to individual vCenter instances
- **N-VDS Removal**: N-VDS on ESX removed starting NSX 4.0.0.1—all environments must use native vSphere Distributed Switch (VDS) 7.0+
- **Converged VDS**: Migrate all ESX transport nodes from N-VDS to VDS before upgrading
- **NSX-V Retired**: NSX for vSphere 6.x fully retired and not included in VCF 9

### NSX Components

**NSX Manager**
- Installs automatically as part of VCF or workload domain creation
- Ensures workload domains are VPC-ready from the start

**Edge Nodes**
- New deployment method via vCenter UI (previously SDDC Manager)
- Minimum **Medium form factor** required for vSphere Supervisor enablement
- Supports Intel and AMD EPYC chipsets
- **Active/Standby mode** required for VPC connectivity when enabling Supervisor/VCF Automation
- **Centralized Connectivity Gateway mode** required for vSphere Supervisor and VCF Automation

**Transport Zones**
- TEP (Tunnel End Point) can now use VMkernel (VMK0) interface instead of dedicated VMkernel
- Reduces IP address allocation requirements for hosts
- **EDP Standard** (Enhanced Data Path) is default host switch mode for new installations

### Key Changes from Previous Versions

**Deployment Changes**
- Edge deployment moved from SDDC Manager to vCenter GUI
- NSX VIBs now pre-packaged with ESX VIBs—single upgrade operation instead of two maintenance windows
- Transit Gateway replaces Tier-1 Gateway when deploying via vCenter wizard

**Networking Models**
- VCF 9 introduces **VPC Networking** alongside traditional Segment Networking
- VPC model provides public cloud-like experience for networking/security configuration

**Deprecated Features**
- Physical Server Connectivity via NSX Agent removed—no overlay connectivity for physical servers
- KVM host NSX policies and non-VMware OpenStack integration not migrateable to NSX 9

**Load Balancing**
- NSX native load balancer deprecated
- **Avi Load Balancer** (now VMware Aria Load Balancer) required for L4-L7 load balancing services

### Network Virtualization Options

**When NSX Required**
- vSphere Supervisor deployment
- VCF Automation services
- Overlay networking requirements
- Kubernetes/VKS with NSX VPC

**When Optional**
- Traditional VM workloads can use VLAN-backed port groups
- NSX sits ready but doesn't force network topology changes
- Can continue existing VLAN-based infrastructure

**Import Requirements**
- VI domains require NSX 4.1.0.2+ for import into VCF 9
- Clusters without NSX get it deployed automatically during import

### Sources

- [VCF 9 Networking Models - vstellar](https://vstellar.com/2025/07/vcf-9-part-3-networking-models/)
- [NSX Overview - Broadcom TechDocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/overview-of-vmware-cloud-foundation-9/what-is-vmware-cloud-foundation-and-vmware-vsphere-foundation/nsx-overview.html)
- [VCF 9 NSX What's New - Broadcom Release Notes](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/release-notes/vmware-cloud-foundation-90-release-notes/platform-whats-new/whats-new-nsx.html)
- [VCF 9 Deprecated Features - StarWind](https://www.starwindsoftware.com/blog/vcf9-deprecated-vsphere-nsx/)
- [NSX Edge Deployment VCF 9 - gibsonvirt](https://gibsonvirt.com/2025/06/18/vcf-9-nsx-edge-cluster-deployment-and-vpc-configuration/)
- [VCF 9 NSX Edge Setup - vrealize.it](https://vrealize.it/2025/07/11/vcf9-nsx-edge-setup-what-has-changed/)
- [VCF 9 What's New NSX - vmcheese](https://vmcheese.com/vcf-9-is-here-whats-new-in-nsx.html)
- [NSX Edge Installation Requirements - Broadcom TechDocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/advanced-network-management/administration-guide/installing-nsx-edge/nsx-edge-installation-requirements.html)
