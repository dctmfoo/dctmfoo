---
title: Network Prerequisites
description: VLANs, IP addressing, MTU, and physical network requirements
---

## Network Prerequisites for VCF 9

### Required VLANs

| VLAN Purpose | Description | MTU |
|--------------|-------------|-----|
| Management | Core management components (vCenter, SDDC Manager, NSX Manager) | 1500 (min) |
| VM Management | Tenant/VM workload traffic | 1500 (min) |
| vMotion | VM live migration between ESXi hosts | 9000 |
| vSAN | Storage traffic for vSAN clusters | 9000 |
| Host TEP | NSX Host Overlay tunnel endpoints | 1600 (min), 9000 (recommended) |
| Edge TEP | NSX Edge tunnel endpoints | 1600 (min), 9000 (recommended) |
| Uplink VLANs | Tier-0 gateway BGP peering (2-4 VLANs typical) | 1500 |

Minimum of 5 VLANs required for VCF Fleet Deployment. Each network type requires unique subnets and gateways—cannot share between Management and VM_MANAGEMENT.

### IP Address Requirements

**Management Domain Components:**
- vCenter Server: 1 IP (+ 1 temporary IP during upgrades)
- SDDC Manager: 1 IP
- NSX Manager Cluster: 3 IPs + 1 VIP
- ESXi Hosts: 1 management IP per host
- Control Plane: Block of 5 static IPs required

**Network Pools (Auto-assigned):**
- vMotion: 1 IP per host
- vSAN: 1 IP per host
- Host TEP: 2+ IPs per host (from IP pool)
- Edge TEP: IPs from dedicated pool

**VPC Networking:**
- VPC External IP Blocks: /16 recommended (non-overlapping with physical network)
- Private Transit Gateway Blocks: /16 recommended (not advertised externally)

All IPs are static. DHCP only supported for NSX Host Overlay (TEP) VLAN if configured.

### MTU Requirements

| Network Type | Minimum MTU | Recommended MTU |
|--------------|-------------|-----------------|
| Management | 1500 | 1500 |
| VM Management | 1500 | 1500 |
| vMotion | 9000 | 9000 |
| vSAN | 9000 | 9000 |
| NSX Overlay (TEP) | 1600 | 9000 |
| Physical Switch Ports | 9216 | 9216 |

GENEVE encapsulation requires minimum 1600 MTU for header space. Configure jumbo frames end-to-end on physical and virtual infrastructure consistently.

### Physical Network Requirements

**Switch Port Configuration:**
- Individual trunk ports (NOT in LAG/port-channel/LACP)
- MTU 9216 on all ports
- Allow required VLANs
- Flow control: receive on

**Multi-Chassis Technologies:**
- VLT, VSX, MC-LAG supported between switches
- No LACP/LAG on individual host uplinks

**Example Dell OS10 Config:**
```
interface ethernet1/1/44
  no shutdown
  switchport mode trunk
  switchport trunk allowed vlan 1023-1040
  mtu 9216
  flowcontrol receive on
```

**Spanning Tree:**
- Ensure PortFast/Edge on host ports
- Use RSTP or MST for fast convergence
- Verify no ports blocked on VCF VLANs

### Subnet Sizing

| Network Type | Minimum | Recommended | Notes |
|--------------|---------|-------------|-------|
| Management | /24 | /24 | ~50 IPs for management domain |
| VM Management | /24 | /22 | Scale based on workload VMs |
| vMotion | /24 | /24 | 1 IP per host, typically <50 hosts |
| vSAN | /24 | /24 | 1 IP per host |
| Host TEP | /24 | /23 | 2+ IPs per host |
| Edge TEP | /24 | /24 | Based on Edge node count |
| VPC External | /16 | /16 | Split across VPCs as needed |

Plan for growth: vSAN supports max 32 hosts per cluster (24 recommended). Network pools should accommodate all planned workload domains.

### DNS Requirements

- Forward and reverse DNS records required for all FQDNs
- Every FQDN must resolve to unique IP
- Critical for VCF management components

### Sources

- https://blog.leaha.co.uk/2025/10/16/vcf-9-ultimate-deployment-guide/
- https://vstellar.com/2025/07/vcf-9-part-3-networking-models/
- https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0.html
- https://puneetsharma.blog/2025/07/22/vcf-9-deployment-best-practices-avoiding-common-pitfalls-for-a-smooth-private-cloud-journey/
- https://knowledge.broadcom.com/external/article/318111/vmware-cloud-foundation-design-decision.html
- https://williamlam.com/2025/07/initial-mikrotik-router-switch-configuration-for-vcf-9-0.html
