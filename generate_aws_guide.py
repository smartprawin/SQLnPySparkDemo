import os, re

base = r'F:/Data Engineering/SQLnPySparkDemo/aws-guide'

# Sidebar for AWS guide
sidebar_nav = '''    <nav class="sidebar-nav" style="padding:.75rem 0;">
      <!-- S3 -->
      <div class="sidebar__section is-collapsed">
        <div class="sidebar__heading"><span>S3</span><span class="sidebar__heading-icon">▼</span></div>
        <ul class="sidebar__links">
          <li><a href="s3.html#s3-features" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Features</a></li>
          <li><a href="s3.html#s3-classes" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Storage Classes</a></li>
          <li><a href="s3.html#s3-security" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Security</a></li>
          <li><a href="s3.html#s3-versioning" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Versioning</a></li>
          <li><a href="s3.html#s3-folder-structure" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Folder Structure</a></li>
          <li><a href="s3.html#s3-cross-account" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Cross-Account</a></li>
        </ul>
      </div>
      <!-- Glue -->
      <div class="sidebar__section is-collapsed">
        <div class="sidebar__heading"><span>Glue</span><span class="sidebar__heading-icon">▼</span></div>
        <ul class="sidebar__links">
          <li><a href="glue.html#glue-intro" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Intro</a></li>
          <li><a href="glue.html#glue-catalog" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Data Catalog</a></li>
          <li><a href="glue.html#dynamic-frames" class="sidebar__link"><span class="sidebar__link-icon">▸</span> DynamicFrames</a></li>
          <li><a href="glue.html#dpu-workers" class="sidebar__link"><span class="sidebar__link-icon">▸</span> DPU & Workers</a></li>
          <li><a href="glue.html#glue-crawler" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Crawler Triggers</a></li>
          <li><a href="glue.html#glue-jobs" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Glue Jobs</a></li>
          <li><a href="glue.html#glue-workflows" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Workflows & Bookmarks</a></li>
        </ul>
      </div>
      <!-- Lambda -->
      <div class="sidebar__section is-collapsed">
        <div class="sidebar__heading"><span>Lambda</span><span class="sidebar__heading-icon">▼</span></div>
        <ul class="sidebar__links">
          <li><a href="lambda.html#lambda-intro" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Intro</a></li>
          <li><a href="lambda.html#lambda-layers" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Layers</a></li>
          <li><a href="lambda.html#lambda-limitations" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Limitations</a></li>
          <li><a href="lambda.html#boto3-invoke" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Boto3 Invoke</a></li>
          <li><a href="lambda.html#lambda-glue-trigger" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Glue Trigger</a></li>
        </ul>
      </div>
      <!-- SCD -->
      <div class="sidebar__section is-collapsed">
        <div class="sidebar__heading"><span>SCD</span><span class="sidebar__heading-icon">▼</span></div>
        <ul class="sidebar__links">
          <li><a href="scd.html#scd-types" class="sidebar__link"><span class="sidebar__link-icon">▸</span> SCD Types</a></li>
          <li><a href="scd.html#scd-2-example" class="sidebar__link"><span class="sidebar__link-icon">▸</span> SCD2 Example</a></li>
        </ul>
      </div>
      <!-- ETL / Incremental -->
      <div class="sidebar__section is-collapsed">
        <div class="sidebar__heading"><span>ETL & Incremental</span><span class="sidebar__heading-icon">▼</span></div>
        <ul class="sidebar__links">
          <li><a href="etl.html#etl-vs-elt" class="sidebar__link"><span class="sidebar__link-icon">▸</span> ETL vs ELT</a></li>
          <li><a href="etl.html#medallion" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Medallion</a></li>
          <li><a href="etl.html#incremental-loads" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Incremental Loads</a></li>
          <li><a href="etl.html#cdc-dms" class="sidebar__link"><span class="sidebar__link-icon">▸</span> CDC & DMS</a></li>
        </ul>
      </div>
      <!-- Redshift -->
      <div class="sidebar__section is-collapsed">
        <div class="sidebar__heading"><span>Redshift</span><span class="sidebar__heading-icon">▼</span></div>
        <ul class="sidebar__links">
          <li><a href="redshift.html#redshift-intro" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Intro</a></li>
          <li><a href="redshift.html#redshift-architecture" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Architecture</a></li>
          <li><a href="redshift.html#redshift-spectrum" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Spectrum</a></li>
          <li><a href="redshift.html#redshift-distribution" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Distribution</a></li>
          <li><a href="redshift.html#redshift-sort-keys" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Sort Keys</a></li>
          <li><a href="redshift.html#redshift-optimization" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Optimization</a></li>
        </ul>
      </div>
      <!-- Airflow -->
      <div class="sidebar__section is-collapsed">
        <div class="sidebar__heading"><span>Airflow</span><span class="sidebar__heading-icon">▼</span></div>
        <ul class="sidebar__links">
          <li><a href="airflow.html#airflow-intro" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Intro</a></li>
          <li><a href="airflow.html#airflow-operators" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Operators</a></li>
          <li><a href="airflow.html#airflow-sensors" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Sensors</a></li>
          <li><a href="airflow.html#airflow-dag" class="sidebar__link"><span class="sidebar__link-icon">▸</span> DAG Example</a></li>
          <li><a href="airflow.html#airflow-catchup" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Catchup & Depends</a></li>
          <li><a href="airflow.html#airflow-vs-stepfunctions" class="sidebar__link"><span class="sidebar__link-icon">▸</span> vs Step Functions</a></li>
        </ul>
      </div>
      <!-- DevOps -->
      <div class="sidebar__section is-collapsed">
        <div class="sidebar__heading"><span>DevOps</span><span class="sidebar__heading-icon">▼</span></div>
        <ul class="sidebar__links">
          <li><a href="devops.html#git-github" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Git & GitHub</a></li>
          <li><a href="devops.html#secrets-manager" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Secrets Manager</a></li>
          <li><a href="devops.html#status-codes" class="sidebar__link"><span class="sidebar__link-icon">▸</span> Status Codes</a></li>
        </ul>
      </div>
    </nav>'''

navbar = '''  <nav class="navbar">
    <a href="index.html" class="navbar__brand">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      <span class="navbar__title">AWS Data Engineering</span>
    </a>
    <div class="navbar__spacer"></div>
    <div class="navbar__links" style="display:flex;gap:.25rem;align-items:center;flex-wrap:nowrap;overflow-x:auto;">
      <a href="index.html" class="navbar__btn">Home</a>
      <a href="s3.html" class="navbar__btn">S3</a>
      <a href="glue.html" class="navbar__btn">Glue</a>
      <a href="lambda.html" class="navbar__btn">Lambda</a>
      <a href="redshift.html" class="navbar__btn">Redshift</a>
      <a href="airflow.html" class="navbar__btn">Airflow</a>
      <a href="etl.html" class="navbar__btn">ETL</a>
    </div>
    <div class="navbar__actions">
      <button class="navbar__btn search-trigger" aria-label="Search" title="Search (Ctrl+K)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </button>
      <button class="navbar__btn theme-toggle" id="theme-toggle" aria-label="Toggle theme">
        <span class="icon-sun" style="display:none;">☀️</span>
        <span class="icon-moon">🌙</span>
      </button>
      <button class="sidebar-toggle" id="hamburger" aria-label="Toggle navigation">
        <span class="hamburger">
          <span class="hamburger__bar"></span>
          <span class="hamburger__bar"></span>
          <span class="hamburger__bar"></span>
        </span>
      </button>
      <a href="../index.html" class="navbar__btn hub-mobile" title="Back to Hub Home">🏠 Hub</a>
    </div>
  </nav>'''

def make_page(title, active, content):
    nav_active = navbar.replace(f'href="{active}" class="navbar__btn"', f'href="{active}" class="navbar__btn navbar__btn--primary"') if active else navbar
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} - AWS Data Engineering</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
{nav_active}
  <div class="sidebar-overlay" id="mobile-overlay"></div>
  <aside class="sidebar" id="mobile-nav" aria-label="Mobile navigation">
    <div style="padding:1.5rem 1.25rem 1rem;">
      <div style="font-weight:700;font-size:1.125rem;color:var(--color-heading);margin-bottom:1rem;">AWS Data Engineering</div>
{sidebar_nav}
    </div>
  </aside>
  <div class="search-overlay" id="search-overlay">
    <div class="search-modal">
      <div class="search-modal__input-wrapper">
        <span class="search-modal__icon">🔍</span>
        <input id="search-input" class="search-modal__input" type="text" placeholder="Search topics..." />
        <span class="search-modal__shortcut">Ctrl+K</span>
      </div>
      <div id="search-results" class="search-modal__results"></div>
    </div>
  </div>
  <div class="bookmarks-panel" id="bookmarks-panel" style="position:fixed;top:var(--nav-height);right:0;width:320px;max-height:calc(100vh - var(--nav-height));background:var(--color-surface);border-left:1px solid var(--color-border);z-index:150;overflow-y:auto;padding:1.25rem;display:none;">
    <h3 style="font-size:1rem;font-weight:600;margin-bottom:1rem;color:var(--color-heading);">Bookmarks</h3>
    <div id="bookmarks-list"></div>
  </div>
  <div class="progress-bar" style="position:fixed;top:var(--nav-height);left:var(--sidebar-width);right:0;height:4px;z-index:90;background:var(--color-bg-tertiary);">
    <div class="progress-bar__track" style="height:4px;">
      <div class="progress-bar__fill" id="progress-bar-fill" style="width:0%;"></div>
    </div>
  </div>
  <aside class="sidebar" id="sidebar">
    <div style="padding:.5rem 1.25rem .75rem;border-bottom:1px solid var(--color-border);">
      <button id="sidebar-toggle" style="background:none;border:none;cursor:pointer;padding:.25rem;color:var(--color-text-secondary);font-size:.8rem;display:flex;align-items:center;gap:.375rem;width:100%;justify-content:space-between;">
        <span style="font-weight:600;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--color-text-tertiary);">Contents</span>
        <span style="font-size:.625rem;">◀</span>
      </button>
    </div>
{sidebar_nav}
  </aside>
  <main class="main" style="margin-left:var(--sidebar-width);">
    <div class="main__content">
{content}
    </div>
  </main>
  <footer style="margin-left:var(--sidebar-width);padding:2rem 3rem;border-top:1px solid var(--color-border);text-align:center;color:var(--color-text-tertiary);font-size:.875rem;">
    <p>AWS Data Engineering — S3, Glue, Lambda, Redshift, Airflow</p>
    <p style="margin-top:.5rem;">© 2024 AWS Guide. Built for Data Engineers.</p>
  </footer>
  <script src="js/main.js"></script>
</body>
</html>'''

def section(id, badge, title, body, tid=None):
    tid = tid or id
    m = {"easy":"badge--easy","intermediate":"badge--intermediate","advanced":"badge--advanced"}
    b = m.get(badge,"badge--easy")
    icon = {"easy":"🟢","intermediate":"🟡","advanced":"🔴"}[badge]
    return f'''
      <section id="{id}" class="topic-section">
        <div class="topic-section__header">
          <span class="badge {b}">{icon} {badge.title()}</span>
          <div class="topic-section__actions">
            <button class="bookmark-btn" data-topic-id="{tid}">☆</button>
            <button class="topic-complete-btn" data-topic-id="{tid}">Mark as Complete</button>
          </div>
        </div>
        <h2>{title}</h2>
{body}
      </section>'''

def code(lang, txt):
    esc = txt.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")
    return f'''
        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__lang">{lang}</span>
            <button class="code-block__copy" aria-label="Copy code">Copy</button>
          </div>
          <pre><code>{esc}</code></pre>
        </div>'''

pages = {}

# INDEX
pages['index.html'] = make_page("AWS Data Engineering", "index.html", '''
      <section class="hero" style="background:linear-gradient(135deg,#f59e0b 0%,#ef4444 50%,#7c3aed 100%);padding:4rem 2rem;border-radius:16px;color:#fff;position:relative;overflow:hidden;margin-bottom:3rem;">
        <div style="position:relative;z-index:1;">
          <div style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(255,255,255,.15);padding:.35rem .85rem;border-radius:999px;font-size:.85rem;margin-bottom:1rem;">☁️ AWS Data Engineering • S3 • Glue • Lambda • Redshift • Airflow</div>
          <h1 style="font-size:2.6rem;font-weight:800;color:#fff;margin:.5rem 0;">AWS Data Engineering</h1>
          <p style="font-size:1.15rem;opacity:.92;max-width:680px;">End-to-end AWS lessons from the provided AWS lessons.txt — S3 features & classes, security, Glue DynamicFrames & DPU, Lambda triggers, SCD, Redshift distribution & sort keys, Airflow DAGs, all without overwriting SQL/PySpark.</p>
          <div style="display:flex;gap:.75rem;margin-top:1.5rem;flex-wrap:wrap;">
            <a href="s3.html" class="hero__btn hero__btn--primary" style="background:#fff;color:#f59e0b;padding:.85rem 1.4rem;border-radius:8px;font-weight:600;text-decoration:none;">Start with S3 →</a>
            <a href="glue.html" class="hero__btn hero__btn--secondary" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);padding:.85rem 1.4rem;border-radius:8px;font-weight:600;text-decoration:none;">Explore Glue</a>
          </div>
        </div>
      </section>
      <h2 style="text-align:center;">Learning Path</h2>
      <p style="text-align:center;color:var(--color-text-secondary);margin-bottom:2rem;">8 chapters derived directly from AWS lessons.txt</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.25rem;margin-bottom:3rem;">
        <a href="s3.html" style="text-decoration:none;background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:1.5rem;display:block;"><div style="font-size:1.4rem;">🪣 01</div><h3>S3</h3><p style="color:var(--color-text-secondary);font-size:.9rem;">Features, Classes, Security, Versioning, Folder Structure, Cross-Account</p><span style="color:var(--color-primary);font-weight:600;">Explore →</span></a>
        <a href="glue.html" style="text-decoration:none;background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:1.5rem;display:block;"><div style="font-size:1.4rem;">🔧 02</div><h3>Glue</h3><p style="color:var(--color-text-secondary);font-size:.9rem;">Catalog, DynamicFrames, DPU Workers, Crawlers, Jobs, Workflows, Bookmarks</p><span style="color:var(--color-primary);font-weight:600;">Explore →</span></a>
        <a href="lambda.html" style="text-decoration:none;background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:1.5rem;display:block;"><div style="font-size:1.4rem;">λ 03</div><h3>Lambda</h3><p style="color:var(--color-text-secondary);font-size:.9rem;">Serverless, Layers, Limitations, Boto3, Glue Triggers</p><span style="color:var(--color-primary);font-weight:600;">Explore →</span></a>
        <a href="scd.html" style="text-decoration:none;background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:1.5rem;display:block;"><div style="font-size:1.4rem;">🕰️ 04</div><h3>SCD Types</h3><p style="color:var(--color-text-secondary);font-size:.9rem;">SCD 0-6 with PySpark example for SCD2</p><span style="color:var(--color-primary);font-weight:600;">Explore →</span></a>
        <a href="etl.html" style="text-decoration:none;background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:1.5rem;display:block;"><div style="font-size:1.4rem;">🔄 05</div><h3>ETL & Incremental</h3><p style="color:var(--color-text-secondary);font-size:.9rem;">ETL vs ELT, Medallion, Incremental Loads, CDC/DMS</p><span style="color:var(--color-primary);font-weight:600;">Explore →</span></a>
        <a href="redshift.html" style="text-decoration:none;background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:1.5rem;display:block;"><div style="font-size:1.4rem;">🏢 06</div><h3>Redshift</h3><p style="color:var(--color-text-secondary);font-size:.9rem;">MPP, Columnar, Spectrum, Distribution, Sort Keys, Optimization</p><span style="color:var(--color-primary);font-weight:600;">Explore →</span></a>
        <a href="airflow.html" style="text-decoration:none;background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:1.5rem;display:block;"><div style="font-size:1.4rem;">🌬️ 07</div><h3>Airflow</h3><p style="color:var(--color-text-secondary);font-size:.9rem;">Operators, Sensors, DAG, Catchup/Depends, vs Step Functions</p><span style="color:var(--color-primary);font-weight:600;">Explore →</span></a>
        <a href="devops.html" style="text-decoration:none;background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:1.5rem;display:block;"><div style="font-size:1.4rem;">🔐 08</div><h3>DevOps</h3><p style="color:var(--color-text-secondary);font-size:.9rem;">Git/GitHub, Secrets Manager, Status Codes</p><span style="color:var(--color-primary);font-weight:600;">Explore →</span></a>
      </div>
''')

# S3
pages['s3.html'] = make_page("S3", "s3.html",
    section('s3-features','easy','S3 Features — 10 Fundamentals', '''
        <p>S3 (Simple Storage Service) is scalable, durable (11 9s), secure, and highly available. From the lessons.txt feature list:</p>
        <ol>
          <li><strong>Scalable storage</strong> — stores structured, semi-structured, unstructured data</li>
          <li><strong>Durability 99.999999999%</strong> — 11 nines</li>
          <li><strong>Highly protected & replicated across regions</strong> — avoids redundancy loss</li>
          <li><strong>Security:</strong> Encryption (SSE-S3 AES256, SSE-KMS, DSSE-KMS, client-side) + IAM/Bucket Policies + ACLs</li>
          <li><strong>Lifecycle management</strong> — auto-transition between storage classes</li>
          <li><strong>Event notifications</strong> (SNS) on create/delete/change</li>
          <li><strong>Cross-Region Replication (CRR)</strong> — disaster recovery</li>
          <li><strong>Logging & Monitoring</strong> via CloudWatch — every action recorded</li>
          <li><strong>MFA</strong> support</li>
          <li><strong>Access control</strong> — IAM, bucket policies (JSON), ACLs (legacy)</li>
        </ol>
        <div class="tip-card"><div class="tip-card__title">Interview Tip</div><div class="tip-card__body">Emphasize durability, replication, and that S3 is not just storage but an event source for Lambda/Glue.</div></div>
''') +
    section('s3-classes','intermediate','S3 Storage Classes', '''
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>Class</th><th>Access</th><th>Retrieval</th><th>Cost</th></tr></thead><tbody>
          <tr><td><strong>S3 Standard</strong></td><td>Frequent</td><td>Millis, always available</td><td>Higher</td></tr>
          <tr><td><strong>Intelligent-Tiering</strong></td><td>Auto frequent ↔ infrequent</td><td>Millis</td><td>Optimized, cheaper than Standard</td></tr>
          <tr><td><strong>S3 Glacier</strong></td><td>Archival</td><td>Minutes to 12 hours</td><td>Very low</td></tr>
          <tr><td><strong>Glacier Deep Archive</strong></td><td>Rarely accessed</td><td>~12 hours</td><td>Lowest</td></tr>
          <tr><td><strong>One Zone-IA</strong></td><td>Infrequent, single AZ</td><td>Millis</td><td>Low</td></tr>
        </tbody></table></div>
        <p>Choose Standard for hot data, Intelligent-Tiering for unknown patterns, Glacier for archival.</p>
''') +
    section('s3-security','advanced','S3 Security — Encryption & Access Control', '''
        <h3>Encryption</h3>
        <ul>
          <li><strong>Server-Side (SSE-S3 AES256)</strong> — AWS encrypts after receipt, manages keys</li>
          <li><strong>SSE-KMS</strong> — AWS KMS manages keys, auditable</li>
          <li><strong>DSSE-KMS</strong> — dual-layer with KMS</li>
          <li><strong>Client-Side</strong> — encrypt on client before send (e.g., WhatsApp), client manages keys</li>
          <li><strong>In-Transit</strong> — TLS during transfer</li>
        </ul>
        <h3>Bucket Policy Example (from lessons.txt)</h3>
        '''+code('JSON','{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Effect": "Allow",\n    "Principal": "*",\n    "Action": "s3:GetObject",\n    "Resource": "arn:aws:s3:::mybucket/*"\n  }]\n}')+'''
        <h3>IAM vs ACL</h3>
        <ul>
          <li><strong>IAM Policies</strong> — centralized, user/group/role (RBAC), bucket-level</li>
          <li><strong>ACLs</strong> — object/bucket level, legacy, AWS recommends IAM</li>
        </ul>
''') +
    section('s3-versioning','intermediate','Versioning, Delete & Logging', '''
        <p>Enable versioning — every upload gets a unique VersionId. S3 never overwrites, it creates a new version.</p>
        <ul>
          <li><strong>mydata.csv v1.1, mydata1.csv</strong> — each has distinct VersionId</li>
          <li><strong>Delete</strong> in versioned bucket adds a <em>delete marker</em>, not removal — delete the marker to restore, or specify VersionId to permanently delete</li>
          <li><strong>Logging/Monitoring</strong> via CloudWatch (application/system/access/security logs), CloudWatch Events/EventBridge for notifications</li>
        </ul>
''') +
    section('s3-folder-structure','intermediate','Folder Structure — E-commerce Example (from lessons.txt)', '''
        <p>From the prompt: 10 CSV via SFTP + 2 REST APIs (Google Analytics, Facebook) + 15 JDBC tables. Organize by zone and source with date prefix:</p>
        '''+code('text','s3://your-bucket-name/\n├── raw_data/\n│   ├── FINANCE/csv_files/2025-03-07_file1.csv\n│   ├── SALES/google_analytics/2025-03-07_google_analytics_data.json\n│   ├── SALES/facebook_insights/2025-03-07_facebook_insights_data.json\n│   └── SALES/jdbc_tables/table1/2025-03-07_table1_part1.csv\n├── processed_data/cleaned/2025-03-07_cleaned_file1.csv\n├── staging_data/intermediate/\n├── archive/2025-03/\n└── metadata/sftp_file_manifest.json')+'''
        <p>Code from file:</p>
        '''+code('Python',"filename = 'finance' + datetime.now().strftime('%d%m%y') + '.csv'\nlink = 'c://myfolder/finance/csv/' + filename")+'''
        <div class="tip-card"><div class="tip-card__title">Tip</div><div class="tip-card__body">Use <code>yyyy-mm-dd</code> prefix and separate raw/processed/staging/archive to make data easily accessible and lifecycle-manageable.</div></div>
''') +
    section('s3-cross-account','advanced','Cross-Account Sharing (Account A → B)', '''
        <ol>
          <li>Account A adds bucket policy trusting Account B</li>
          <li>Account B creates access point linked to Account A bucket</li>
          <li>Account B adds access point policy granting IAM roles</li>
          <li>Account B attaches IAM policy to the role</li>
          <li>Account B uses access point ARN instead of bucket name</li>
        </ol>
''')
)

# Glue
pages['glue.html'] = make_page("Glue", "glue.html",
    section('glue-intro','easy','AWS Glue — Serverless ETL', '''
        <p>Glue is serverless (no backend to maintain), scales automatically, supports Python/Scala/PySpark. Versions from file: Glue 4, Python 3.11-3.13, Spark 3.3, Pandas 1.3.</p>
        <p>Sources: S3 (CSV/JSON/Parquet/Avro), JDBC (RDS/Redshift/MySQL/Postgres/SQL Server), DynamoDB, Kinesis, REST API, SFTP. Classifiers detect JSON/CSV/Parquet.</p>
''') +
    section('glue-catalog','intermediate','Data Catalog, Crawlers & Schema Registry', '''
        <p><strong>Data Catalog</strong> = centralized metadata repository (data about data: types, size, format). <strong>Crawlers</strong> scan sources to infer schema and create/update tables (schema evolution). <strong>Schema Registry</strong> stores schema versions with compatibility modes:</p>
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>Mode</th><th>Meaning</th></tr></thead><tbody><tr><td>Backward</td><td>New schema can read old data</td></tr><tr><td>Forward</td><td>Old schema can read new data</td></tr><tr><td>Full</td><td>Both</td></tr><tr><td>None</td><td>No checks</td></tr></tbody></table></div>
        <h3>Crawler Triggers</h3>
        <p><strong>Scheduled (12am daily → 12:30am crawler, cron <code>30 0 * * ? *</code>)</strong> — simple but not real-time, may run even if no data.</p>
        <p><strong>Event-based (S3 PUT → Lambda → start_crawler)</strong> — real-time, only runs on upload.</p>
        '''+code('Python',"import boto3\ndef lambda_handler(event,context):\n    glue = boto3.client('glue')\n    glue.start_crawler(Name='name of the crawler')\n    return {'statusCode':200,'body':'Crawler started'}")+'''
        <p>S3 → Event Notification (PUT on bucket) → Lambda → EventBridge (crawler Succeeded) → Glue Job. Alternative: Glue Workflows (crawler → job → notification).</p>
''') +
    section('dynamic-frames','advanced','DynamicFrames vs DataFrames', '''
        <p>From file: DynamicFrames are flexible, DataFrames are strict.</p>
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>Feature</th><th>DynamicFrame</th><th>DataFrame</th></tr></thead><tbody>
          <tr><td>Schema flexible</td><td>Yes (choice type)</td><td>No (strict StructType)</td></tr>
          <tr><td>Null tolerance</td><td>Yes</td><td>No</td></tr>
          <tr><td>Nested JSON</td><td>Yes (builtin)</td><td>Manual flatten</td></tr>
          <tr><td>Error handling</td><td>errorRecords</td><td>Manual try/except</td></tr>
        </tbody></table></div>
        <p>Example from file: order 103 has '300' (string) and 104 has 'na' — DataFrame fails, DynamicFrame creates choice type <code>int or string</code> and you resolve:</p>
        '''+code('Python',"dyf = dyf.resolveChoice(specs=[('amount', 'cast:int')])\ndf = dyf.toDF()\n# Convert back\n# df to dyf: dyf = DynamicFrame.fromDF(df, glueContext, 'mydynamicframe')")+'''
        <p>Flow: raw → Glue reads DynamicFrame → resolve choice → transform → convert to DataFrame → write to S3.</p>
        <p>Also auto-merges schemas: file1 (orderid, amount) + file2 (orderid, amount, discount) → single schema.</p>
''') +
    section('dpu-workers','intermediate','DPU & Worker Types', '''
        <p>1 DPU = 4 vCPU + 16 GB RAM. Number of workers × DPU per worker = total DPUs.</p>
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>Worker Type</th><th>DPU</th><th>Resources</th><th>Use Case</th></tr></thead><tbody>
          <tr><td>G.1X</td><td>1</td><td>4 vCPU, 16GB</td><td>Small-medium, &lt;20GB, simple transforms, no heavy joins</td></tr>
          <tr><td>G.2X</td><td>2</td><td>8 vCPU, 32GB</td><td>50-300GB, heavy joins, shuffles</td></tr>
          <tr><td>G.4X</td><td>4</td><td>16 vCPU, 64GB</td><td>300GB-1TB, wide tables, skew</td></tr>
          <tr><td>G.8X</td><td>8</td><td>32 vCPU, 128GB</td><td>TB scale, many joins, skew</td></tr>
        </tbody></table></div>
        <p>Example from file: 500GB daily, heavy joins → G.2X, 20 workers, 40 DPUs, auto-scaling true.</p>
''') +
    section('glue-crawler','intermediate','Glue Crawler Details', '''
        <p>Crawlers infer schema and update Data Catalog, handling schema evolution. Scheduled vs event-based as above.</p>
        <p>Give S3 permission to invoke Lambda, and Lambda permission to start crawler via IAM.</p>
''') +
    section('glue-jobs','advanced','Glue ETL Jobs', '''
        <p>Written in Python/Scala/PySpark: extract → transform (filter, join, deduplication) → load to S3/Redshift/Postgres/MySQL.</p>
        '''+code('Python',"from awsglue.context import GlueContext\nfrom pyspark.context import SparkContext\nsc = SparkContext()\nglueContext = GlueContext(sc)\nspark = glueContext.spark_session\n\ndyf = glueContext.create_dynamic_frame.from_catalog(database='landingdb', table_name='sales')\nnewdyf = dyf.dropDuplicates()\ndf = newdyf.toDF()\ndf.write.parquet('s3://finals3bucket', index=False)")+'''
        <p>Flow: S3 PUT → Lambda → Crawler (EventBridge on Succeeded → Glue Job) or Workflows.</p>
''') +
    section('glue-workflows','intermediate','Workflows, Bookmarks & CDC', '''
        <p><strong>Workflows</strong>: Glue Workflows orchestrate crawler → job → notification. Alternative to EventBridge.</p>
        <p><strong>Job Bookmarks</strong>: Track last processed record (hidden table in Data Catalog, often via timestamp). Enable in Job parameters → enable job bookmarks → incremental loads.</p>
        <p><strong>CDC</strong> via AWS DMS: full load + CDC, captures inserts/updates/deletes via timestamp columns (created_at, updated_at), avoids full scan, near real-time, lands to S3 then crawler → Redshift.</p>
        <p>Other incremental methods from file: file timestamp & naming convention (<code>mydata_01012025.json</code>), Lambda on S3, prefix/suffix filtering.</p>
''')
)

# Lambda
pages['lambda.html'] = make_page("Lambda", "lambda.html",
    section('lambda-intro','easy','Lambda — Serverless Compute', '''
        <p>Serverless, no servers to manage, auto-scales, event-driven (S3, DynamoDB, Glue, CloudWatch) or time-based, stateless, supports Python/Node/Java/C#/Go. From file: mainly used for triggers.</p>
''') +
    section('lambda-layers','intermediate','Layers', '<p>Predefined packages (e.g., pandas layers) or custom packages via AWS CLI to use within Lambda.</p>') +
    section('lambda-limitations','intermediate','Limitations', '''
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>Limit</th><th>Value</th></tr></thead><tbody>
          <tr><td>Timeout</td><td>15 minutes</td></tr>
          <tr><td>Memory</td><td>10 GB</td></tr>
          <tr><td>Deployment package</td><td>50 MB (250 MB via S3)</td></tr>
          <tr><td>Concurrency</td><td>1000 per region (increasable)</td></tr>
          <tr><td>Cold start</td><td>Latency on first invoke</td></tr>
        </tbody></table></div>
''') +
    section('boto3-invoke','intermediate','Boto3 — Invoke Lambda', code('Python',"import boto3\nlambda_client = boto3.client('s3', region_name='us-east-1')\nresponse = lambda_client.invoke(\n  FunctionName='my_lambda_function',\n  InvocationType='RequestResponse'\n)\nprint(response['Payload'].read().decode())")) +
    section('lambda-glue-trigger','advanced','Invoke Glue Job via Lambda', code('Python',"""import boto3, json
def lambda_handler(event, context):
    # event has S3 Records: bucket name and key
    bucketname = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    glue_client = boto3.client('glue', region_name='us-east-1')
    response = glue_client.start_job_run(
        JobName='my_glue_job',
        Arguments={'--arg1':'value1'}
    )
    return {'statusCode':200,'body': json.dumps('Glue job started')}""")+'''
        <p>Event contains <code>Records[0].s3.bucket.name</code> and <code>object.key</code>. Context has function name, memory, remaining time, request ID.</p>
''')
)

# SCD
pages['scd.html'] = make_page("SCD Types", "scd.html",
    section('scd-types','easy','SCD Types Overview', '''
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>Type</th><th>Behavior</th></tr></thead><tbody>
          <tr><td>SCD 0</td><td>Fixed, no updates allowed</td></tr>
          <tr><td>SCD 1</td><td>Overwrite on top</td></tr>
          <tr><td>SCD 2</td><td>New row with start_date, end_date, flag</td></tr>
          <tr><td>SCD 3</td><td>Add new column for previous value</td></tr>
          <tr><td>SCD 4</td><td>Historical data in different table</td></tr>
          <tr><td>SCD 6</td><td>Hybrid (1+2+3)</td></tr>
        </tbody></table></div>
''') +
    section('scd-2-example','advanced','SCD 2 Example (from file)', '''
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>id</th><th>name</th><th>address</th><th>startdate</th><th>enddate</th><th>flag</th></tr></thead><tbody>
          <tr><td>1</td><td>indumati</td><td>123 mg road</td><td>01012025</td><td>03082025</td><td>N</td></tr>
          <tr><td>1</td><td>indumati</td><td>234 mg road</td><td>03082025</td><td>31129999</td><td>Y</td></tr>
        </tbody></table></div>
        '''+code('Python',"from pyspark.sql import SparkSession\nfrom pyspark.sql.functions import lit, current_date\nspark = SparkSession.builder.appName('myapplication').getOrCreate()\nnewdf = customerdf.withColumn('startdate',current_date()).withColumn('enddate',lit('9999-12-31')).withColumn('FLAG',lit('Y'))")+'''
        <p>SCD 3 example from file: id | name | address | job title | previous job title — tracks previous value in new column.</p>
''')
)

# ETL
pages['etl.html'] = make_page("ETL & Incremental", "etl.html",
    section('etl-vs-elt','intermediate','ETL vs ELT', '''
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>ETL</th><th>ELT</th></tr></thead><tbody>
          <tr><td>Transform before load, OLTP, normalized, keep raw, slower, less storage</td><td>Transform at destination, large data, simple transforms, faster, needs more warehouse storage, highly scalable, cloud tools: Snowflake, Databricks, BigQuery</td></tr>
        </tbody></table></div>
        <p><strong>When:</strong> On-prem, complex preload validation, small-medium → ETL. Large, simple, real-time analytics, cloud → ELT.</p>
''') +
    section('medallion','easy','Medallion Architecture', '<p><strong>Bronze</strong>: raw (unstructured/semi/structured) → <strong>Silver</strong>: cleaned/enriched (join, filter) → <strong>Gold</strong>: business answers (aggregations like daily revenue, total sales by region).</p>') +
    section('incremental-loads','advanced','Incremental Loads — How We Handled It (from file)', '''
        <ol>
          <li>Enabled job bookmarks (timestamp/id column) — processes only new data</li>
          <li>Landing bucket with yyyy_mm_dd directory structure</li>
          <li>System to identify new/updated files (naming convention <code>mydata_01012025.json</code>, prefix/suffix, Lambda on S3 PUT)</li>
          <li>Timestamp config table: store max timestamp, fetch where lastupdated > max</li>
          <li>CDC via AWS DMS (full load + CDC) → S3 → crawler → Redshift with MERGE (upsert)</li>
        </ol>
        '''+code('Python',"lastprocessedtime = df.agg(max(col('lastupdated'))).collect()[0][0]\ndf = spark.read.jdbc(sourceurl, 'table', properties=properties)\ndf = df.filter(col('lastupdated') > lastprocessedtime)")) +
    section('cdc-dms','advanced','CDC & DMS', '''
        <p>CDC identifies inserts/updates/deletes, avoids full scan, near real-time, ideal for incremental loads.</p>
        <p><strong>AWS DMS</strong>: Source endpoint (MySQL) → Target endpoint (S3) → enable CDC mode (full load + CDC or CDC only) → configure format (JSON/CSV/Parquet) → S3 landing → Glue crawler → Redshift. DMS captures changes via timestamp columns.</p>
''')
)

# Redshift
pages['redshift.html'] = make_page("Redshift", "redshift.html",
    section('redshift-intro','easy','Redshift — Petabyte Data Warehouse', '''
        <p>Fully managed, petabyte scale, part of AWS. From file: supports multiple databases per cluster, uses <code>psycopg2</code> or <code>boto3</code> via JDBC.</p>
''') +
    section('redshift-architecture','intermediate','Architecture — MPP & Columnar', '''
        <ul>
          <li><strong>Leader Node</strong>: manages client communication, coordinates, compiles/optimizes query plan, distributes data — does not store data, handles metadata</li>
          <li><strong>Compute Nodes</strong>: store data and execute queries, each divided into <em>slices</em> handling a piece of data/workload</li>
          <li><strong>MPP</strong>: massively parallel processing — each node works independently</li>
          <li><strong>Columnar storage</strong> (like Parquet/ORC) — read-optimized for OLAP, large analytics</li>
        </ul>
        <p>Parallel query execution: divides query into smaller parts executed in parallel across nodes.</p>
''') +
    section('redshift-spectrum','intermediate','Redshift Spectrum vs Athena', '''
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>Athena</th><th>Redshift Spectrum</th></tr></thead><tbody>
          <tr><td>Serverless, fully managed, query S3 directly via Glue Catalog/RDS</td><td>Extension of Redshift, servers managed in cluster, mixes Redshift + S3</td></tr>
          <tr><td>Ad-hoc analysis/validation</td><td>Join S3 tables with Redshift tables without importing</td></tr>
        </tbody></table></div>
''') +
    section('redshift-distribution','advanced','Distribution Styles', '''
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>Style</th><th>When</th></tr></thead><tbody>
          <tr><td><strong>Key</strong> — distribute by specific column</td><td>Frequently joined data</td></tr>
          <tr><td><strong>Even</strong> — evenly across slices</td><td>No key to distribute on</td></tr>
          <tr><td><strong>All</strong> — copy entire table to every slice</td><td>Small tables, no shuffling (joins within slice)</td></tr>
        </tbody></table></div>
''') +
    section('redshift-sort-keys','advanced','Sort Keys', '''
        <p>Defines order data is stored on disk within each compute node.</p>
        <ul>
          <li><strong>Compound</strong>: one or more columns in listed order — e.g., <code>sortkey(orderdate, productid, region)</code> effective when filtering/sorting on leading columns</li>
          <li><strong>Interleaved</strong>: balanced order for multiple columns — e.g., sales table frequently queried by region, orderdate, productid with no priority → use interleaved</li>
        </ul>
        '''+code('SQL','CREATE TABLE sales(\n  orderid BIGINT,\n  custid BIGINT,\n  orderdate DATE,\n  amount DECIMAL(10,2)\n)\nDISTKEY(customerid)\nSORTKEY(orderdate); -- or INTERLEAVED SORTKEY(orderdate, customerid);')) +
    section('redshift-optimization','advanced','Optimization Techniques (from file)', '''
        <ol>
          <li>Right distribution style</li>
          <li>Proper sort keys</li>
          <li>Avoid SELECT * (column pruning)</li>
          <li>Predicate pushdown (WHERE early)</li>
          <li>VACUUM and ANALYZE (update statistics, reclaim space)</li>
          <li>Avoid unnecessary JOINs, prefer INNER over LEFT</li>
          <li>Partitioning data</li>
        </ol>
        <p>Features: highly scalable, columnar, compression, MPP, cross-DB integration, automatic optimization. Limitations: not for small data, not real-time streaming, can be expensive.</p>
''')
)

# Airflow
pages['airflow.html'] = make_page("Airflow", "airflow.html",
    section('airflow-intro','easy','Airflow — Orchestration', '''
        <p>Open-source workflow management for complex data pipelines — scheduling, monitoring, managing. From file: handles 10 CSV via SFTP + 2 REST APIs + 15 JDBC tables.</p>
        <p><strong>100GB daily</strong> example from file: MySQL + API → DMS incremental CDC → S3 → Lambda → Crawler (EventBridge) → Glue → S3 → Airflow (S3KeySensor → S3ToRedshiftOperator) → Redshift. Orchestrated via Airflow.</p>
        <p><strong>2GB MySQL</strong> example: DMS → S3 → Lambda (pandas) → S3 → Airflow/Step Functions.</p>
''') +
    section('airflow-operators','intermediate','Operators', '''
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>Operator</th><th>Use</th></tr></thead><tbody>
          <tr><td>PythonOperator</td><td>Run Python functions, trigger processing</td></tr>
          <tr><td>BashOperator</td><td>Run bash commands (ls, cd, mkdir, cp, mv, rm)</td></tr>
          <tr><td>S3ToRedshiftOperator</td><td>Move S3 files to Redshift (COPY)</td></tr>
          <tr><td>SqlOperator</td><td>Interact with SQL objects</td></tr>
          <tr><td>EmailOperator</td><td>Send success/failure notifications</td></tr>
          <tr><td>DummyOperator</td><td>Placeholder for start/end</td></tr>
        </tbody></table></div>
''') +
    section('airflow-sensors','intermediate','Sensors', '''
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>Sensor</th><th>Waits For</th></tr></thead><tbody>
          <tr><td>FileSensor</td><td>File to appear</td></tr>
          <tr><td>HttpSensor</td><td>HTTP endpoint available</td></tr>
          <tr><td>SqlSensor</td><td>SQL query to return desired result</td></tr>
          <tr><td>S3KeySensor</td><td>Key to exist in S3 bucket</td></tr>
        </tbody></table></div>
        <p>Example flow: <code>dummy >> FileSensor(True) >> EmailOperator >> PythonOperator(df.write) >> S3KeySensor(True) >> S3ToRedshiftOperator >> dummy</code></p>
''') +
    section('airflow-dag','advanced','DAG Example (from file)', code('Python',"""from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.amazon.aws.transfers.s3_to_redshift import S3ToRedshiftOperator
from airflow.providers.amazon.aws.sensors.s3 import S3KeySensor
from datetime import datetime
import pandas as pd, pysftp, requests, json

default_args = {'owner':'airflow','depends_on_past':True,'start_date':datetime(2026,3,25),'retries':3}
dag = DAG(dag_id='my_dag', default_args=default_args, schedule_interval='@daily', catchup=False)

def extract_from_sftp(**kwargs):
    with pysftp.Connection(sftp_host, port=22, username='user', password='pass') as sftp:
        sftp.get('/remote/file.csv', 'tmp/data.csv')

def extract_from_jdbc(**kwargs):
    from airflow.providers.postgres.hooks.postgres import PostgresHook
    hook = PostgresHook(postgres_conn_id='jdbc_conn')
    df = hook.get_pandas_df('select * from mytable')
    df.to_csv('tmp/data.csv', index=False)

extract_sftp = PythonOperator(task_id='extract_from_sftp', python_callable=extract_from_sftp, dag=dag)
extract_jdbc = PythonOperator(task_id='extract_from_jdbc', python_callable=extract_from_jdbc, dag=dag)
sensor = S3KeySensor(task_id='s3_key_sensor', bucket_name='mybucket', bucket_key='finaldata/data.csv', poke_interval=60, timeout=3600, dag=dag)
load = S3ToRedshiftOperator(task_id='load_to_redshift', schema='public', table='mytable', s3_bucket='mybucket', s3_key='finaldata/data.csv', redshift_conn_id='redshift', dag=dag)

extract_sftp >> sensor
extract_jdbc >> sensor
sensor >> load""")+'''
        <p>Hooks: PostgresHook, MySqlHook, OracleHook, JdbcHook, HttpHook, S3Hook. XCom: <code>xcom_push</code>/<code>xcom_pull</code> to exchange data between tasks. DAG = collection of tasks with <code>>></code> dependencies.</p>
        <p>Variables/Connections stored in Airflow Admin → Variables/Connections (e.g., s3_key, SFTP/JDBC/AWS).</p>
''') +
    section('airflow-catchup','advanced','Catchup & DependsOnPast', '''
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>Combo</th><th>Behavior</th><th>Use When</th></tr></thead><tbody>
          <tr><td>catchup=True, depends=True</td><td>Creates many past runs, each waits for previous — sensitive, one failure blocks all</td><td>Strict order, monitoring retries</td></tr>
          <tr><td>catchup=False, depends=True</td><td>No backfill, today waits for yesterday</td><td>Daily incremental, CDC — most common in production</td></tr>
          <tr><td>catchup=True, depends=False</td><td>Backfills, no waiting</td><td>Full refresh, historical rebuild</td></tr>
          <tr><td>catchup=False, depends=False</td><td>Only latest, no dependency</td><td>Daily dashboards, API daily calls</td></tr>
        </tbody></table></div>
        <p>From file: DAG daily, start_date 25032025, catchup True creates runs for past dates, False only for current/future. DependsOnPast = task waits for previous run's same task success.</p>
''') +
    section('airflow-vs-stepfunctions','intermediate','Airflow vs Step Functions', '''
        <div class="table-wrapper"><table class="comparison-table"><thead><tr><th>Step Functions</th><th>Airflow</th></tr></thead><tbody>
          <tr><td>AWS managed, serverless, event-driven, short orchestration, pay per transaction, built-in retries, max 1 year (15 min Lambda)</td><td>Open source, self-managed (or MWAA), perfect for ETL/complex dependencies, free (pay for server), configurable retries, no limit, parallel via XCom</td></tr>
          <tr><td>Easy setup, stateless, no parallel XCom</td><td>Complex setup, parallel executions, XCom push/pull</td></tr>
        </tbody></table></div>
        <p>Choose Step Functions for AWS-native short workflows, Airflow for complex ETL with many dependencies.</p>
''')
)

# DevOps
pages['devops.html'] = make_page("DevOps", "devops.html",
    section('git-github','easy','Git & GitHub', '''
        <p><strong>Git</strong>: version control — track changes, go back, collaborate, branches for testing without affecting main.</p>
        <p><strong>GitHub</strong>: hosting platform — stores code online, collaborates.</p>
        '''+code('Bash',"""git init
git add .
git commit -m 'message'
git push -u origin main
git clone <url>
git status
git log
git branch / git branch <name>
git checkout <branch> / git checkout -b <new>
git pull origin develop
git stash
git revert <commit>""")+'''
        <div class="warning-card"><div class="warning-card__title">Merge Conflict</div><div class="warning-card__body">2 devs edit same line (df.filter status) → <code>git pull origin develop</code> before push, resolve manually.</div></div>
        <p>Credentials stored in <strong>AWS Secrets Manager</strong> (all connection details).</p>
''') +
    section('secrets-manager','easy','Secrets Manager', '<p>All connection and credential details in AWS stored in AWS Secrets Manager, not hardcoded.</p>') +
    section('status-codes','easy','Status Codes', '''
        <p>From file: 1xx informational, 2xx success, 3xx redirection, 4xx client error, 5xx server error</p>
        '''+code('Python',"""status_codes = {100:"Informational",200:"Success",300:"Redirection",400:"Client Error",500:"Server Error"}\nfor code, desc in status_codes.items():\n    print(f"{code}: {desc}")"""))
)

# Write all
for fname, html in pages.items():
    path = os.path.join(base, fname)
    open(path, 'w', encoding='utf-8').write(html)
    print(f"Wrote {fname}")

# Update search TOPICS for aws-guide
js_path = os.path.join(base, 'js/main.js')
js = open(js_path, encoding='utf-8').read()
new_topics = """  // All searchable topics (id, title, url, content summary) - AWS Data Engineering
  var TOPICS = [
    { id: 's3-features',           title: 'S3 Features',                        url: 's3.html#s3-features',                  tags: 's3 features scalable durability replication' },
    { id: 's3-classes',            title: 'S3 Storage Classes',                 url: 's3.html#s3-classes',                   tags: 's3 classes standard intelligent tiering glacier deep archive' },
    { id: 's3-security',           title: 'S3 Security',                        url: 's3.html#s3-security',                  tags: 's3 security encryption iam bucket policy acl sse kms' },
    { id: 's3-versioning',         title: 'S3 Versioning',                      url: 's3.html#s3-versioning',                tags: 's3 versioning delete marker logging cloudwatch' },
    { id: 's3-folder-structure',    title: 'S3 Folder Structure',                url: 's3.html#s3-folder-structure',           tags: 's3 folder structure ecommerce raw finance sales' },
    { id: 's3-cross-account',      title: 'S3 Cross-Account Sharing',           url: 's3.html#s3-cross-account',             tags: 's3 cross account bucket policy access point' },
    { id: 'glue-intro',            title: 'AWS Glue Intro',                     url: 'glue.html#glue-intro',                   tags: 'glue serverless etl pyspark versions' },
    { id: 'glue-catalog',          title: 'Glue Data Catalog',                  url: 'glue.html#glue-catalog',                 tags: 'glue catalog crawler schema registry backward forward' },
    { id: 'dynamic-frames',        title: 'DynamicFrames vs DataFrames',        url: 'glue.html#dynamic-frames',               tags: 'glue dynamicframe dataframe choice type' },
    { id: 'dpu-workers',           title: 'Glue DPU Workers',                   url: 'glue.html#dpu-workers',                  tags: 'glue dpu workers g1x g2x g4x g8x' },
    { id: 'glue-crawler',          title: 'Glue Crawler Triggers',              url: 'glue.html#glue-crawler',                 tags: 'glue crawler scheduled event lambda s3' },
    { id: 'glue-jobs',             title: 'Glue ETL Jobs',                      url: 'glue.html#glue-jobs',                    tags: 'glue jobs pyspark dynamicframe s3 redshift' },
    { id: 'glue-workflows',        title: 'Glue Workflows & Bookmarks',         url: 'glue.html#glue-workflows',               tags: 'glue workflows bookmarks cdc dms incremental' },
    { id: 'lambda-intro',          title: 'Lambda Intro',                       url: 'lambda.html#lambda-intro',               tags: 'lambda serverless event driven' },
    { id: 'lambda-layers',         title: 'Lambda Layers',                      url: 'lambda.html#lambda-layers',              tags: 'lambda layers pandas' },
    { id: 'lambda-limitations',    title: 'Lambda Limitations',                 url: 'lambda.html#lambda-limitations',         tags: 'lambda limitations timeout memory concurrency cold start' },
    { id: 'boto3-invoke',          title: 'Boto3 Invoke Lambda',                url: 'lambda.html#boto3-invoke',               tags: 'boto3 invoke lambda' },
    { id: 'lambda-glue-trigger',   title: 'Lambda Glue Trigger',                url: 'lambda.html#lambda-glue-trigger',        tags: 'lambda glue trigger boto3 s3 event' },
    { id: 'scd-types',             title: 'SCD Types',                          url: 'scd.html#scd-types',                     tags: 'scd slowly changing dimensions 0 1 2 3 4 6' },
    { id: 'scd-2-example',         title: 'SCD2 Example',                       url: 'scd.html#scd-2-example',                 tags: 'scd2 pyspark startdate enddate flag' },
    { id: 'etl-vs-elt',            title: 'ETL vs ELT',                         url: 'etl.html#etl-vs-elt',                    tags: 'etl elt extract transform load' },
    { id: 'medallion',             title: 'Medallion Architecture',             url: 'etl.html#medallion',                     tags: 'medallion bronze silver gold' },
    { id: 'incremental-loads',     title: 'Incremental Loads',                  url: 'etl.html#incremental-loads',             tags: 'incremental loads job bookmarks timestamp' },
    { id: 'cdc-dms',               title: 'CDC & DMS',                          url: 'etl.html#cdc-dms',                       tags: 'cdc dms change data capture mysql s3' },
    { id: 'redshift-intro',        title: 'Redshift Intro',                     url: 'redshift.html#redshift-intro',           tags: 'redshift warehouse petabyte' },
    { id: 'redshift-architecture', title: 'Redshift Architecture',              url: 'redshift.html#redshift-architecture',    tags: 'redshift architecture mpp columnar leader compute slices' },
    { id: 'redshift-spectrum',     title: 'Redshift Spectrum',                  url: 'redshift.html#redshift-spectrum',        tags: 'redshift spectrum athena s3' },
    { id: 'redshift-distribution', title: 'Redshift Distribution',              url: 'redshift.html#redshift-distribution',    tags: 'redshift distribution key even all' },
    { id: 'redshift-sort-keys',    title: 'Redshift Sort Keys',                 url: 'redshift.html#redshift-sort-keys',       tags: 'redshift sort keys compound interleaved' },
    { id: 'redshift-optimization', title: 'Redshift Optimization',              url: 'redshift.html#redshift-optimization',    tags: 'redshift optimization distribution sort' },
    { id: 'airflow-intro',         title: 'Airflow Intro',                      url: 'airflow.html#airflow-intro',             tags: 'airflow orchestration etl 100gb 2gb' },
    { id: 'airflow-operators',     title: 'Airflow Operators',                  url: 'airflow.html#airflow-operators',         tags: 'airflow operators python bash s3toredshift' },
    { id: 'airflow-sensors',       title: 'Airflow Sensors',                    url: 'airflow.html#airflow-sensors',           tags: 'airflow sensors file http sql s3key' },
    { id: 'airflow-dag',           title: 'Airflow DAG Example',                url: 'airflow.html#airflow-dag',               tags: 'airflow dag pythonoperator s3keysensor' },
    { id: 'airflow-catchup',       title: 'Airflow Catchup & Depends',          url: 'airflow.html#airflow-catchup',           tags: 'airflow catchup depends_on_past' },
    { id: 'airflow-vs-stepfunctions', title: 'Airflow vs Step Functions',      url: 'airflow.html#airflow-vs-stepfunctions',  tags: 'airflow step functions managed' },
    { id: 'git-github',            title: 'Git & GitHub',                       url: 'devops.html#git-github',                 tags: 'git github init add commit push branch' },
    { id: 'secrets-manager',       title: 'Secrets Manager',                    url: 'devops.html#secrets-manager',            tags: 'secrets manager credentials' },
    { id: 'status-codes',          title: 'Status Codes',                       url: 'devops.html#status-codes',               tags: 'status codes 100 200 300 400 500' }
  ];"""
old_pat = re.compile(r'  // All searchable topics.*?var TOPICS = \[.*?\];', re.S)
if old_pat.search(js):
    js = old_pat.sub(new_topics, js)
    js = js.replace('var TOTAL_TOPICS = 30;', 'var TOTAL_TOPICS = 39;')
    open(js_path,'w',encoding='utf-8').write(js)
    print("Updated TOPICS")
else:
    print("Pattern not found")
