---
title: vSphere / ESXi Requirements
description: ESXi and vCenter Server requirements for VCF 9
---

## vSphere / ESXi Requirements for VCF 9

### Supported ESXi Versions
- VCF 9.0 ships with **vSphere 9.0** (now branded as "ESX" rather than "ESXi")
- vCenter version must be equal to or higher than ESX host version
- ESX 8.0 hosts can be mixed with ESX 9.0 hosts using Custom EVC (requires vCenter 9.0)
- vSphere 8.x Update 3 remains available as standalone editions (Standard/Enterprise Plus)
- vSphere 9.0 is only available through VCF or VVF bundles

### Hardware Requirements

**CPU:**
- Minimum: Intel Sandy Bridge or AMD Bulldozer (for XSAVE instruction support)
- Supported Intel generations: Nehalem through Ice Lake and newer
- Supported AMD generations: Opteron Gen 1-4, Piledriver, Steamroller, Zen/Zen 2/Zen 3
- Hardware virtualization required (Intel VT-x or AMD RVI)
- Certain older CPU generations deprecated and will show warnings during installation
- For VCF Automation (VCFA): Host must have at least 12 cores/24 threads to provision 24 vCPU VM

**Memory:**
- ESX 9.0 minimum: 8 GB physical RAM
- Production recommended: 12 GB minimum per host
- Lab deployment total: ~194 GB across management domain

**Storage:**
- Boot disk minimum: 32 GB persistent storage (HDD, SSD, or NVMe)
- Recommended boot device: 128 GB for new deployments
- Boot device should support 128 TB written (TBW) with 100 MB/s sequential write
- RAID 1 mirrored boot device recommended for resiliency
- Lab deployment storage: ~3.2 TB total, ~330 GB used

**Network:**
- Minimum: One or more Gigabit Ethernet controllers
- 10GbE NIC pre-check enabled for workload domain deployment
- VCF 9.0 supports single pNIC (VCF 5.x required minimum 2 pNICs)
- Minimum 5 VLANs required for VCF Fleet deployment

### ESXi Host Preparation

**BIOS Settings:**
- UEFI boot mode recommended
- Enable Intel VT-x or AMD-V/RVI
- Enable hardware virtualization extensions

**Firmware Requirements:**
- Current firmware recommended for all server components
- NIC firmware should be compatible with VMware HCL

**Network Configuration:**
- Configure management VLAN on physical NICs
- Ensure DHCP or static IP assignment before deployment
- DNS resolution required for all hosts

**Important Notes:**
- Stateless ESX hosts not supported
- Non-certified ESA disks allowed for PoC only (VCF 9.0.1+)
- AMD Ryzen CPUs require workaround for NVMe Tiering

### vCenter Server Requirements

**Version:**
- vCenter 9.0 included with VCF 9.0

**Sizing Options:**
- Small, Medium, Large, X-Large based on environment size
- Medium sufficient for smaller environments
- Can scale out to clustered deployment later

**Minimal Lab Resources (Management Domain):**
- Total vCPU: 48
- Total Memory: 194 GB
- Total Storage: 3.2 TB

### Compatibility Notes

**Supported:**
- vSAN OSA and ESA for principal storage
- NFSv3 and Fibre Channel VMFS as principal storage (new in VCF 9)
- Minimum 2 hosts with external storage, 3 hosts with vSAN
- Mixed ESX 8.0/9.0 clusters using Custom EVC

**Deprecated/Removed:**
- Host Profiles deprecated (use vSphere Configuration Profiles)
- vSphere Lifecycle Manager baselines no longer supported (use images)
- vSphere Update Manager legacy workflows removed

**Limitations:**
- Production vSAN deployments: 4 hosts recommended for HA/maintenance
- VCFA minimum 24 vCPU (can manually reduce to 16 or 12 with performance impact)

### Sources
- [Broadcom TechDocs - ESX Hardware Requirements](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-0/esx-installation-and-setup/installing-and-setting-up-esxi/esxi-requirements/esxi-hardware-requirements.html)
- [VMware Blog - What's New with vSphere in VCF 9.0](https://blogs.vmware.com/cloud-foundation/2025/06/23/vsphere-in-vcf-9-0-whats-new/)
- [VMware Cloud Foundation 9.0 Documentation](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0.html)
- [Preparing ESX Hosts for VCF](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/deployment/deploying-a-new-vmware-cloud-foundation-or-vmware-vsphere-foundation-private-cloud-/preparing-your-environment/preparing-esx-hosts-for-vmware-cloud-foundation-or-vmware-vsphere-foundation.html)
- [Minimal Resources for VCF 9.0 Lab](https://williamlam.com/2025/06/minimal-resources-for-deploying-vcf-9-0-in-a-lab.html)
- [CPU Support Deprecation in VCF Releases](https://knowledge.broadcom.com/external/article/318697/cpu-support-deprecation-and-discontinuat.html)
- [vCenter Server Appliance Requirements](https://techdocs.broadcom.com/us/en/vmware-cis/vsphere/vsphere/9-0/vcenter-installation-and-setup/deploying-the-vcenter-server-appliance/vcenter-server-appliance-requirements/vcenter-server-appliance-requirements.html)
