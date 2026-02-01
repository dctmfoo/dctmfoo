---
title: Licensing Model
description: VCF 9 licensing changes and subscription model
---

## VCF 9 Licensing Model

### Licensing Changes in VCF 9

**Key Changes from Previous Versions:**
- Single license file replaces multiple 25-character license keys per component
- Subscription-based licensing replaces perpetual licenses entirely
- License keys no longer used - managed via VCF Operations and vcf.broadcom.com portal
- Evaluation period extended from 60 to 90 days
- License assigned to vCenter only; ESXi hosts and components licensed automatically

**Broadcom Acquisition Impact:**
- Product portfolio consolidated from ~168 bundles to 4: VCF, VVF, VVS, and VVEP
- Per-core licensing model enforced across all products
- Customers report 8x-15x price increases post-acquisition
- Hyperscalers (Azure VMware Solution, Google VMware Engine) now require BYOL portable licenses from Broadcom effective November 1, 2025

### License Types / SKUs

**VMware Cloud Foundation (VCF) 9:**
- Full private cloud stack
- Includes: vSphere, vSAN (1 TiB/core), NSX, Aria Advanced, SDDC Manager
- Tanzu Mission Control Self-Managed included for post-acquisition SKUs

**VMware vSphere Foundation (VVF) 9:**
- Narrower scope than VCF
- Includes vSAN at 0.25 TiB/core
- No NSX or Aria Advanced

**VCF Edge:**
- Reduced minimum: 8 cores per CPU (vs 16 for standard VCF)
- Deployment limitations apply

### Licensing Metrics

**Per-Core Licensing:**
- Minimum 16 cores per CPU required
- All physical cores counted, including BIOS-disabled cores
- Example: 2 CPUs × 12 cores each = 32 licensed cores (not 24)

**Subscription Terms:**
- 1, 3, or 5 year terms available
- Multi-year subscriptions optimize cost
- No perpetual licensing option

**License Pooling:**
- Multiple subscription purchases pooled into single capacity total
- Example: 200 cores + 300 cores = 500 core license pool
- Capacity reduces as subscriptions expire

### Component Licensing

**Bundled Components (no separate license):**
- vSphere/ESXi
- vCenter Server
- vSAN (1 TiB per licensed core)
- NSX networking and security
- SDDC Manager
- Aria Operations (Advanced)
- Tanzu Mission Control Self-Managed

**Add-on Licenses:**
- vSAN Add-on: Additional TiB capacity when 1 TiB/core insufficient
- VCF Operations for Networks requires VCF 9.0 licensed vCenter as data source

### Migration Considerations

**Existing License Migration:**
- VCF 5.x environments continue using previous license keys
- Mixed environments supported (VCF 9 + VCF 5.x)
- New subscriptions include both 9.0 license and 8.x license keys
- Total usage across versions cannot exceed purchased capacity

**Compliance Requirements:**
- License usage reports required every 180 days
- Connected mode: Single button click to report
- Disconnected mode: Manual upload/download via vcf.broadcom.com
- 90-day grace period after license expiration

**Cost Implications:**
- Significant price increases reported industry-wide
- 16-core minimum may increase costs for lower-core-count CPUs
- Storage add-ons needed if vSAN usage exceeds 1 TiB/core

### Sources
- [Licensing Overview - Broadcom Techdocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/licensing/licensing-overview.html)
- [Licensing Model - Broadcom Techdocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/licensing/licensing-overview/licensing-model.html)
- [Licensing in VMware Cloud Foundation 9.0 - VMware Blog](https://blogs.vmware.com/cloud-foundation/2025/06/24/licensing-in-vmware-cloud-foundation-9-0/)
- [VMware Cloud Foundation 9.0 General FAQs](https://www.vmware.com/docs/vmware-cloud-foundation-9-0-general-faqs)
- [Mixed-Version Environments - Broadcom Techdocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/licensing/licensing-overview/pre-version-9-licenses-and-support.html)
- [Broadcom VCF Licensing Changes - Pure Storage Blog](https://blog.purestorage.com/perspectives/broadcoms-vcf-licensing-shift-avs-customers/)
- [Broadcom VCF Licensing Changes - Google Cloud Blog](https://cloud.google.com/blog/products/compute/broadcom-vcf-licensing-changes-for-vmware-engine)
