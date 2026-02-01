---
title: Workload Domains
description: Creating and managing workload domains in VCF 9
---

## VCF 9 Workload Domains

### Workload Domain Types

VCF 9 supports two domain types:

**Management Domain**
- Created during VCF deployment or convergence by VCF Installer
- Contains SDDC Manager, vCenter, NSX Manager, and ESXi hosts
- Hosts management components for the VCF instance
- Cannot share its NSX Manager with workload domains

**VI Workload Domains**
- Deployed after management domain creation
- Run customer/business workloads
- Each includes its own vCenter Server
- Can share NSX Manager with other workload domains (not management domain)
- Isolated from management domain for security and resource separation
- Used to logically separate workload types: development, production, etc.

### Creation Process

VCF 9 shifts workload domain creation from SDDC Manager to VCF Operations:

**Via VCF Operations (Recommended)**
1. Login to VCF Operations → Inventory tab → Detailed View
2. Select VCF instance → Add Workload Domain → Create New
3. Confirm prerequisites met → Proceed
4. Specify workload domain name and SSO domain name
5. Select vSphere Lifecycle Manager cluster image
6. Configure NSX Manager (create new or join existing)
7. Choose NSX deployment size (single node for lab, 3-node HA for production)
8. Configure networking: Distributed or Centralized Connectivity
9. Review settings and deploy

**Import Existing vCenter**
- VCF Operations can import existing vSphere 8 environments as workload domains
- NSX Manager deployed during import if not present
- Useful for organizations transitioning from pure vSphere to VCF

**Prerequisites**
- Hosts must be commissioned with target principal storage type
- If management domain has express patch, workload domain hosts need same patch
- vSphere Lifecycle Manager cluster image must be available

### Templates and Profiles

**VDS Profiles**
- Select predefined VDS Profile or customize settings
- Storage Traffic Separation options available
- Configuration can be saved as JSON spec for future deployments

**Planning Workbook**
- VCF Planning and Preparation Workbook redesigned for VCF 9
- Supports expanded deployment topologies
- Inputs ordered to match VCF Operations UI workflow sequence
- Enables stakeholder collaboration on configuration and design

**JSON Spec Export**
- Review page allows downloading JSON specification
- Use for repeatable deployments or documentation

### Scaling

**Adding Hosts to Clusters**
- Use vSphere Client to add ESXi hosts to existing SDDC clusters
- Verify unassigned hosts available in Hosts inventory
- NSX Host Overlay Network TEP pool must have sufficient IPs
- Multiple hosts can be added simultaneously
- Parallel host additions across different clusters supported

**Adding Clusters to Workload Domains**
- In VCF 9.0.0, use Management vCenter (not Workload Domain vCenter)
- Navigate to Workload Domain Datacenter → New SDDC Cluster
- Requires VCF SSO and vCenter Server Linking
- SDDC Manager Add Cluster button still functional
- Commission hosts via Management Domain with WLD network pool

**Stretched Cluster Expansion**
- Add same number of hosts to both availability zones
- Maintains symmetry and cluster balance

### Best Practices

**Design Recommendations**
- Use 3-node NSX Manager cluster for production (HA)
- Single NSX node acceptable for lab/dev environments
- Match storage type across hosts in a domain (e.g., vSAN ESA)
- Consider Centralized Connectivity if deploying Supervisor services

**Operational Best Practices**
- Import one low-risk workload domain first as pilot
- Run full lifecycle drill: patching, certs, password rotation, rollback
- Prove HA/DR with real failover/failback before production
- Keep pilot production-grade but small scale
- Treat identity, licensing, backups, cert rotation as Day-0 work

**Storage Notes**
- vVols deprecated in VCF 9.0 (removal planned in future release)
- FC and NFS supported for management domain storage
- No requirement to use vSAN for management domain

**New VCF 9 Features**
- Cluster renaming now dynamically reflects across platform
- Supervisor enablement simplified to toggle switch with minimal inputs
- VCF Operations consolidates Day-2 automation and lifecycle tasks

### Sources

- [Create a New Workload Domain Using VCF Operations](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/building-your-private-cloud-infrastructure/working-with-workload-domains/deploy-a-vi-workload-domain-using-the-sddc-manager-ui.html)
- [Managing VCF Domains in VMware Cloud Foundation](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/building-your-private-cloud-infrastructure/working-with-workload-domains.html)
- [Import an Existing vCenter to Create a Workload Domain](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/building-your-private-cloud-infrastructure/working-with-workload-domains/import-an-existing-vcenter-to-create-a-workload-domain.html)
- [Add an ESX Host to an SDDC Cluster](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/building-your-private-cloud-infrastructure/working-with-workload-domains/expand-a-workload-domain/add-a-host-to-a-vsphere-cluster-using-the-sddc-manager-ui.html)
- [Add an SDDC Cluster to a VCF Domain](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/building-your-private-cloud-infrastructure/working-with-workload-domains/expand-a-workload-domain/add-a-cluster-to-a-workload-domain-using-the-sddc-manager-ui.html)
- [How to Add a Cluster to a Workload Domain in VCF 9.0.0](https://vrealize.it/2025/07/30/how-to-add-a-cluster-to-a-workload-domain-in-vcf-9-0-0-yes-its-weird-right-now/)
- [VCF 9 Integrating vSphere 8 as Workload Domain](https://vrealize.it/2025/07/31/vcf-9-integrating-a-vsphere-8-environment-as-a-new-workload-domain/)
- [Planning a Successful VCF 9.0 Deployment](https://blogs.vmware.com/cloud-foundation/2025/07/28/planning-a-successful-vmware-cloud-foundation-9-0-deployment/)
- [10 VCF 9.0 Enhancements](https://blogs.vmware.com/cloud-foundation/2025/09/18/10-vmware-cloud-foundation-9-enhancements-simplifying-your-day-2-operations/)
- [VCF 9 Part 6: Deploying Workload Domain](https://vstellar.com/2025/07/vcf-9-part-6-deploying-workload-domain/)
- [Creating Workload Domains in VCF 9](https://www.viquarcloud.com/post/creating-workload-domains-in-vmware-cloud-foundation-9-a-shift-from-sddc-manager-to-vcf-operations)
