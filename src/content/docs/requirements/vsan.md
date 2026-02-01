---
title: vSAN Storage Requirements
description: vSAN ESA and OSA requirements for VCF 9
---

## vSAN Requirements for VCF 9

### vSAN Version & Architecture

**ESA (Express Storage Architecture):**
- Single-tier architecture using high-performance NVMe flash devices
- Preferred architecture for VCF 9 deployments
- Compression at top of storage stack (compress-once, write-anywhere)
- Global deduplication (vs per-disk-group in OSA)
- RAID-5/6 erasure coding with RAID-1-level performance
- Up to 240% performance improvement over OSA on same hardware
- Generates 2-3x more components per object than OSA

**OSA (Original Storage Architecture):**
- Two-tier architecture with cache and capacity tiers
- Still fully supported in VCF 9 (not deprecated)
- Required for hybrid configurations (magnetic + flash)
- Better option for organizations with existing non-NVMe hardware

### Hardware Requirements

**vSAN ESA:**
- Minimum 128 GB RAM per host (varies with storage pool size)
- NVMe-only devices (no SATA/SAS support)
- vSAN ESA ReadyNode from HCL required
- No dedicated cache tier needed (single storage pool)
- Minimum 3 hosts for vSAN cluster
- vSAN Advanced or Enterprise license required

**vSAN OSA:**
- Flash caching tier: minimum 10% of capacity tier size
- All-flash: requires flash for both cache and capacity
- Hybrid: magnetic capacity + flash cache devices
- Disk groups required (unlike ESA's single pool)

**Boot Device Requirements:**
- Hosts ≤512 GB RAM: USB, SD, or SATADOM (min 32 GB)
- Hosts >512 GB RAM: SATADOM or disk (min 16 GB, SLC preferred)

**Networking:**
- 10 Gbps NICs minimum required for all VCF deployments

### vSAN Configuration for VCF 9

**Management Domain Storage Options:**
- vSAN (ESA or OSA) - 3 hosts minimum
- Fibre Channel VMFS - 2 hosts minimum (NEW in VCF 9)
- NFSv3 - 2 hosts minimum (NEW in VCF 9)
- vSAN is no longer required for Management Domain

**Additional Storage via Import/Conversion:**
- iSCSI, NFS v4.1, NVMe-oF (FC or TCP) supported when converging existing vSphere environments

**Workload Domain Options:**
- vSAN ESA/OSA
- VMFS on FC
- NFSv3
- External storage arrays

**Storage Policy Defaults:**
- ESA clusters use auto-policy management for optimal defaults
- FTT calculation: 2 × FTT + 1 = minimum hosts needed
- ESA with RAID 0/1 uses 3 disk stripes regardless of policy setting

### Deprecated vSAN Features

**vSAN Hybrid OSA:**
- Officially deprecated in VCF 9
- Will be removed in a future release
- Migrate to all-flash OSA or ESA recommended

**vVols (Virtual Volumes):**
- Deprecated in VCF 9.0
- Full removal planned for VCF 9.1

**Related Deprecations:**
- Host Profiles → replaced by Configuration Profiles
- vCLS (vSphere Clustering Service) → retreat mode recommended
- Enhanced Linked Mode → VCF Operations grouping replaces it
- vLCM Baselines → image-based configuration only

### Best Practices

**Sizing:**
- ESA typically requires fewer hosts for equivalent workloads due to efficiency
- 4 hosts recommended for Management Domain (3 minimum)
- Plan for FTT requirements when sizing clusters

**ESA Migration:**
- No in-place OSA-to-ESA migration available
- Create new ESA cluster and migrate workloads
- Verify hardware on vSAN ESA HCL before planning

**Stretched Clusters:**
- Both ESA and OSA supported
- ESA compresses before replication (reduces inter-site bandwidth)
- Equal hosts per availability zone required

### Sources
- [Broadcom VCF 9.0 Hardware Requirements for vSAN](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/vsan-deployment-administration-and-monitoring/vsan-planning-and-deployment/requirements-for-creating-a-virtual-san-cluster/hardware-requirements-for-virtual-san.html)
- [VCF 9 vSAN Single-Rack HCI ESA Storage Model](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/design/design-library/storage-models(1)/standard-vsan-storage-model/single-rack-storage-models/vcf-hardware-configuration-for-vsan.html)
- [VMware Cloud Foundation 9: Now Ready For All Storage](https://blogs.vmware.com/cloud-foundation/2025/11/11/vmware-cloud-foundation-9-now-ready-for-all-storage/)
- [VCF 9 Storage Options - NetApp](https://community.netapp.com/t5/Tech-ONTAP-Blogs/VCF-9-Storage-options/ba-p/462854)
- [Deprecated Features in VCF 9.0](https://vinfrastructure.it/2025/06/deprecated-features-in-vcf-9-0/)
- [VCF 9 Deprecation Notices - vNinja](https://vninja.net/2025/06/18/vcf9-deprecation-notices/)
- [Key Storage Updates in VMware vSAN 9 with ESA Architecture](https://www.starwindsoftware.com/blog/whats-new-in-storage-with-vmware-cloud-foundation-9-0/)
- [Upgrading VCF 5.2 to 9.0 - Top 10 Questions](https://blogs.vmware.com/cloud-foundation/2025/12/18/upgrading-vmware-cloud-foundation-5-2-to-9-0-the-top-10-questions-answered/)
