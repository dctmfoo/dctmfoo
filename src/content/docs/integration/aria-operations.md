---
title: VCF Operations (Aria)
description: VCF Operations integration and monitoring capabilities
---

## Aria Operations Integration with VCF 9

### Aria Suite Components for VCF 9

VMware Aria Operations has been **rebranded to VCF Operations** in VCF 9. This is not just a name change—it represents a fundamental shift in scope and capability.

**Key changes:**
- Aria Operations → VCF Operations (mandatory deployment in VCF 9)
- Aria Operations for Logs → VCF Operations for Logs (no in-place upgrade; fresh install required)
- Aria Suite Lifecycle → VCF Fleet Management
- vRealize Operations (vROps) → evolved into VCF Operations

**Mandatory components in VCF 9:**
- VCF Fleet Management (formerly Aria Lifecycle)
- VCF Operations (formerly Aria Operations)

You do not need Aria Suite components installed prior to upgrading to VCF 9.0. These mandatory components deploy automatically during upgrade.

### VCF Operations vs Aria Operations

VCF Operations in VCF 9 expands far beyond what Aria Operations offered:

| Aria Operations (Pre-VCF 9) | VCF Operations (VCF 9) |
|----------------------------|------------------------|
| Monitoring and performance | Unified operations center |
| Separate UI from SDDC Manager | Integrated with SDDC Manager |
| Performance assessment only | Fleet management + monitoring + lifecycle |
| Standalone appliance | Consolidated platform |

**VCF Operations main functional areas:**
1. **Fleet Management** - password rotation, certificate rotation, configuration drift detection
2. **Operations Management** - performance monitoring, cost optimization, troubleshooting
3. **Workload Operations** - application health monitoring
4. **FinOps and Capacity** - expense analysis, capacity forecasting

VCF Operations becomes the "one stop shop" for managing VCF environments, consolidating what previously required multiple separate interfaces.

### Integration Steps

**For new VCF 9 deployments:**
VCF Operations deploys automatically as part of the VCF 9 installation process.

**Upgrading from Aria Operations:**
1. Verify Aria Operations version 8.14 or later (8.18.3 recommended)
2. Use Aria Suite Lifecycle Manager to perform upgrade
3. Aria Operations and cloud proxies upgrade to version 9
4. Deploy unified cloud proxy to access new v9 features
5. Migrate integrations from Aria Operations for Logs (no in-place upgrade available)

**Cloud Proxy Architecture:**
- Deploy one cloud proxy per physical data center
- Creates one-way communication between remote environments and VCF Operations
- Cloud proxies collect data locally and push to VCF Operations cluster
- Classic cloud proxy types preserved during upgrade; deploy unified cloud proxy for new features

### Monitoring Capabilities

**Infrastructure monitoring:**
- VCF Health page shows operational health state of all VCF instances
- Unresponsive ESX host detection
- NTP drift sync issues (host and vCenter)
- DNS resolution failures
- vCenter connectivity state and service status
- Resource utilization across domains

**Performance and observability:**
- Predictive analytics and capacity forecasting
- Proactive health monitoring
- Timeline-based incident tracking
- Remediation runbooks for faster MTTI/MTTR
- Integrated log analysis from VCF Operations console
- Network flow monitoring and topology visualization

**Modern workload support:**
- Kubernetes cluster monitoring via Management Pack
- Istio Service Mesh integration for east-west traffic visibility
- Prometheus integration for metrics
- VM and container workload visibility

### Dashboards & Alerts

**Key dashboards:**
- **Overview Page** - summary of all monitored VMware cloud accounts with geo-map view
- **VCF Health Page** - operational health state requiring immediate attention
- **Fleet Management** - vCenter and host configuration status
- **Capacity Forecasting** - resource utilization trends and predictions
- **Compliance Dashboard** - STIG and FIPS compliance status

**Alert capabilities:**
- Proactive alerts for infrastructure issues
- Configuration drift notifications across vCenter Servers and Hosts
- Certificate expiration warnings
- Password rotation reminders
- Performance threshold alerts

**Third-party integrations:**
- Cisco Intersight Management Pack (IMM mode infrastructure)
- Red Hat OpenShift monitoring
- Dell VxRail and PowerFlex integration
- NetApp Data Infrastructure Insights
- Splunk integration for log analysis

### Sources

- [VCF Operations Overview - Broadcom TechDocs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/overview-of-vmware-cloud-foundation-9/what-is-vmware-cloud-foundation-9/vcf-operations-overview.html)
- [Upgrade Aria Operations to VCF Operations 9.0](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/vcf-9-0-and-later/9-0/deployment/upgrading-cloud-foundation/preparing-your-vcf-9-management-components/upgrading-management-components/upgrade-to-vcf-operations.html)
- [Introduction to VCF Operations - vElements.net](https://www.velements.net/2025/03/04/vmware-cloud-foundation-vcf-operations/)
- [VCF 9 Announced Features - vChamp](https://vchamp.net/vcf9-announced-features/)
- [How VCF 9 Simplifies Troubleshooting - VMware Blog](https://blogs.vmware.com/cloud-foundation/2025/08/19/how-vmware-cloud-foundation-9-simplifies-troubleshooting/)
- [VCF 9.0 New Features - Virtualization Howto](https://www.virtualizationhowto.com/2025/06/vmware-cloud-foundation-vcf-9-0-released-new-features/)
- [Upgrade Aria Operations 8.18.3 to VCF Operations 9.0 - Brock Peterson](https://www.brockpeterson.com/post/upgrade-aria-operations-8-18-3-to-vcf-operations-9-0-via-aria-suite-lifecycle-manager)
- [Aria to VCF Ops for Logs Upgrade Path - vDan](https://vdan.cz/vmware/vcf/from-aria-operations-for-logs-to-vcf-ops-for-logs-what-you-need-to-know-about-the-upgrade-path/)
- [VCF Operations Integration SDK - GitHub](https://github.com/vmware/vmware-aria-operations-integration-sdk)
