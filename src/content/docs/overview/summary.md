---
title: Executive Summary
description: High-level overview of VCF 9.0 deployment and migration from VCF 4.5
---

This document consolidates key information for deploying VMware Cloud Foundation 9.0 within an existing VMware environment. VCF 9.0, released June 17, 2025, introduces significant architectural changes including unified versioning (all components at 9.x), a new Fleet management hierarchy, and mandatory deployment of VCF Operations and VCF Automation.

## Critical Migration Notes (4.5 → 9.0)

:::caution[No Direct Upgrade]
Direct upgrade from VCF 4.5 to 9.0 is **NOT** supported. Required path: **VCF 4.5 → VCF 5.2 → VCF 9.0**
:::

| Change | Impact |
|--------|--------|
| SDDC Manager UI | Deprecated (use VCF Operations console) |
| VCF Operations & Automation | Now **mandatory** components |
| Cloud Builder | Replaced by VCF Installer appliance |
| Identity Management | vIDM replaced by VCF Identity Broker |
| Licensing | Single license file, subscription-based only |

## Project Scope

### Objectives
- Integrate VCF 9 into current VMware stack with minimal disruption
- Deploy the VCF 9 Management Domain
- Prepare for future Workload Domains
- Enhance operational consistency through automated lifecycle management

### In-Scope Activities

1. **Assessment & Planning**
   - Review existing vSphere, vSAN, and NSX infrastructure for VCF 9 readiness
   - Validate hardware compatibility, network configuration, and licensing requirements
   - Document existing architecture and identify gaps

2. **Environment Preparation**
   - Prepare ESXi hosts (firmware, BIOS settings, networking, vSAN configuration)
   - Configure prerequisite VLANs, IP schemas, DNS, and NTP services
   - Deploy and validate VCF 9 imaging/bring-up bundles

3. **VCF 9 Deployment**
   - Deploy the VCF 9 Management Domain
   - Configure vCenter Server, SDDC Manager, and vSAN
   - Perform post-deployment validation

4. **Integration & Configuration**
   - Integrate existing VMware resources (identity sources, backup, monitoring)
   - Configure lifecycle management and workload domain templates
   - Implement RBAC and security best practices

5. **Knowledge Transfer**
   - Operational handoff documentation
   - Knowledge-transfer sessions covering SDDC Manager → VCF Operations transition

### Out-of-Scope
- Deployment of additional Workload Domains (unless explicitly added)
- Migration of existing workloads into VCF 9
- Non-VMware infrastructure work
- Application-level changes not directly related to VCF 9

## Deliverables

- [ ] VCF 9 architecture design documentation
- [ ] Validated VCF 9 Management Domain deployed and operational
- [ ] Configuration documentation and as-built runbook
- [ ] Knowledge transfer sessions

---

*Prepared for Shyam | February 2026*
