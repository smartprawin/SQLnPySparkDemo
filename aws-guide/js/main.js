/**
 * PySpark Interview Guide - Main JavaScript
 * Vanilla JS · IIFE Pattern · Production Quality
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  //  CONSTANTS
  // ---------------------------------------------------------------------------
  var TOTAL_TOPICS = 52;
  var STORAGE_KEYS = {
    theme:      'pyspark_theme',
    completed:  'pyspark_completed',
    bookmarks:  'pyspark_bookmarks',
    sidebar:    'pyspark_sidebar_open',
    expandable: 'pyspark_expandable_v2'
  };

  // All searchable topics (id, title, url, content summary) - AWS Data Engineering
  // NOTE: tags mirror docs/AWS/AWS lessons.txt vocabulary so doc phrases are findable via search.
  var TOPICS = [
    { id: 's3-features',           title: 'S3 Features',                        url: 's3.html#s3-features',                  tags: 's3 features scalable durability replication security lifecycle event notifications crr logging monitoring mfa' },
    { id: 's3-classes',            title: 'S3 Storage Classes',                 url: 's3.html#s3-classes',                   tags: 's3 classes standard intelligent tiering glacier deep archive one zone ia retrieval' },
    { id: 's3-security',           title: 'S3 Security',                        url: 's3.html#s3-security',                  tags: 's3 security encryption iam bucket policy acl sse kms dsse client side server side in transit' },
    { id: 's3-versioning',         title: 'S3 Versioning',                      url: 's3.html#s3-versioning',                tags: 's3 versioning versionid delete marker logging cloudwatch application system access security logs monitoring' },
    { id: 's3-folder-structure',    title: 'S3 Folder Structure',                url: 's3.html#s3-folder-structure',           tags: 's3 folder structure ecommerce raw finance sales sftp rest api jdbc processed staging archive' },
    { id: 's3-cross-account',      title: 'S3 Cross-Account Sharing',           url: 's3.html#s3-cross-account',             tags: 's3 cross account bucket policy access point arn account a account b' },
    { id: 'glue-intro',            title: 'AWS Glue Intro',                     url: 'glue.html#glue-intro',                   tags: 'glue serverless etl pyspark versions glue 4 python spark pandas' },
    { id: 'glue-components',       title: 'Glue Components',                    url: 'glue.html#glue-components',              tags: 'glue components glue can import data from multiple sources s3 datalake jdbc rds redshift mysql postgres dynamodb kinesis rest api sftp classifiers json csv parquet data catalog centralised centralized metadata repository automatic schema discovery schema registry glue studio drag and drop' },
    { id: 'glue-catalog',          title: 'Glue Data Catalog',                  url: 'glue.html#glue-catalog',                 tags: 'glue catalog crawler schema registry backward forward full none crawlers scan schema evolution cron scheduled event lambda s3' },
    { id: 'dynamic-frames',        title: 'DynamicFrames vs DataFrames',        url: 'glue.html#dynamic-frames',               tags: 'glue dynamicframe dataframe choice type resolvechoice flexible strict null nested errorrecords' },
    { id: 'dpu-workers',           title: 'Glue DPU Workers',                   url: 'glue.html#dpu-workers',                  tags: 'glue dpu workers g1x g2x g4x g8x vcpu ram autoscaling' },
    { id: 'glue-crawler',          title: 'Glue Crawler Triggers',              url: 'glue.html#glue-crawler',                 tags: 'glue crawler scheduled event lambda s3 s3event eventbridge iam' },
    { id: 'glue-jobs',             title: 'Glue ETL Jobs',                      url: 'glue.html#glue-jobs',                    tags: 'glue jobs pyspark dynamicframe s3 redshift filtering joining deduplication fillna dropna extract transform load' },
    { id: 'glue-workflows',        title: 'Glue Workflows & Bookmarks',         url: 'glue.html#glue-workflows',               tags: 'glue workflows bookmarks cdc dms incremental hidden table timestamp mydata prefix suffix full load' },
    { id: 'lambda-intro',          title: 'Lambda Intro',                       url: 'lambda.html#lambda-intro',               tags: 'lambda serverless event driven components triggers stateless auto scaling python node java' },
    { id: 'lambda-layers',         title: 'Lambda Layers',                      url: 'lambda.html#lambda-layers',              tags: 'lambda layers pandas predefined custom aws cli' },
    { id: 'lambda-limitations',    title: 'Lambda Limitations',                 url: 'lambda.html#lambda-limitations',         tags: 'lambda limitations timeout 15 minutes memory 10gb deployment 50mb 250mb concurrency 1000 cold start' },
    { id: 'boto3-invoke',          title: 'Boto3 Invoke Lambda',                url: 'lambda.html#boto3-invoke',               tags: 'boto3 invoke lambda aws components interact' },
    { id: 'lambda-glue-trigger',   title: 'Lambda Glue Job Trigger',            url: 'lambda.html#lambda-glue-trigger',        tags: 'lambda glue job trigger boto3 s3 event records bucket key context' },
    { id: 'lambda-crawler-trigger', title: 'Lambda Glue Crawler Trigger',       url: 'lambda.html#lambda-crawler-trigger',     tags: 'lambda glue crawler trigger boto3 start_crawler s3 event notification put' },
    { id: 'scd-types',             title: 'SCD Types',                          url: 'scd.html#scd-types',                     tags: 'scd slowly changing dimensions 0 1 2 3 4 6 overwrite history' },
    { id: 'scd-2-example',         title: 'SCD2 Example',                       url: 'scd.html#scd-2-example',                 tags: 'scd2 pyspark startdate enddate flag current_date' },
    { id: 'etl-vs-elt',            title: 'ETL vs ELT',                         url: 'etl.html#etl-vs-elt',                    tags: 'etl elt extract transform load oltp snowflake databricks bigquery' },
    { id: 'medallion',             title: 'Medallion Architecture',             url: 'etl.html#medallion',                     tags: 'medallion bronze silver gold raw cleaned aggregation' },
    { id: 'incremental-loads',     title: 'Incremental Loads',                  url: 'etl.html#incremental-loads',             tags: 'incremental loads job bookmarks timestamp yyyy_mm_dd naming convention lambda prefix suffix lastupdated' },
    { id: 'cdc-dms',               title: 'CDC & DMS',                          url: 'etl.html#cdc-dms',                       tags: 'cdc dms change data capture mysql s3 full load timestamp merge upsert' },
    { id: 'redshift-intro',        title: 'Redshift Intro',                     url: 'redshift.html#redshift-intro',           tags: 'redshift warehouse petabyte psycopg2 boto3 jdbc multiple databases' },
    { id: 'redshift-architecture', title: 'Redshift Architecture',              url: 'redshift.html#redshift-architecture',    tags: 'redshift architecture mpp columnar leader compute slices nodes parallel parquet orc olap' },
    { id: 'redshift-spectrum',     title: 'Redshift Spectrum',                  url: 'redshift.html#redshift-spectrum',        tags: 'redshift spectrum athena s3 without importing serverless' },
    { id: 'redshift-distribution', title: 'Redshift Distribution',              url: 'redshift.html#redshift-distribution',    tags: 'redshift distribution key even all slices joins shuffling' },
    { id: 'redshift-sort-keys',    title: 'Redshift Sort Keys',                 url: 'redshift.html#redshift-sort-keys',       tags: 'redshift sort keys compound interleaved orderdate productid region disk' },
    { id: 'redshift-optimization', title: 'Redshift Optimization',              url: 'redshift.html#redshift-optimization',    tags: 'redshift optimization distribution sort select vacuum analyze predicate pushdown column pruning partitioning compression' },
    { id: 'emr-intro',             title: 'EMR Intro',                          url: 'emr.html#emr-intro',                     tags: 'emr elastic map reduce etl spark hadoop ec2 logs transaction clickstream' },
    { id: 'emr-architecture',      title: 'EMR Architecture',                   url: 'emr.html#emr-architecture',              tags: 'emr architecture master node core nodes task nodes leader team' },
    { id: 'emr-storage',           title: 'EMR Storage Options',                url: 'emr.html#emr-storage',                   tags: 'emr storage hdfs s3 emrfs local file system distributed temporary persistent' },
    { id: 'emr-how',               title: 'How EMR Works',                      url: 'emr.html#emr-how',                       tags: 'emr how distributed processing hadoop mapreduce apache spark map reduce word count' },
    { id: 'emr-code',              title: 'EMR Code Example',                   url: 'emr.html#emr-code',                      tags: 'emr code hourly product views logs s3 transform' },
    { id: 'emr-vs-glue',           title: 'EMR vs Glue',                        url: 'emr.html#emr-vs-glue',                   tags: 'emr vs glue serverless cluster flexible control scalable technical expertise cost' },
    { id: 'snowflake-intro',       title: 'Snowflake Intro',                    url: 'snowflake.html#snowflake-intro',         tags: 'snowflake datawarehouse aws azure gcp multi cluster' },
    { id: 'snowflake-architecture', title: 'Snowflake Architecture',            url: 'snowflake.html#snowflake-architecture',  tags: 'snowflake architecture storage layer compute layer cloud service layer micro partitions virtual warehouse mpp autoscaling' },
    { id: 'snowflake-advantages',  title: 'Snowflake Advantages',               url: 'snowflake.html#snowflake-advantages',    tags: 'snowflake advantages concurrency zero infrastructure json avro parquet automatic vacuum security' },
    { id: 'snowflake-limitations', title: 'Snowflake Limitations',              url: 'snowflake.html#snowflake-limitations',   tags: 'snowflake limitations billing customizable manual optimization' },
    { id: 'snowflake-components',  title: 'Snowflake Components',               url: 'snowflake.html#snowflake-components',    tags: 'snowflake components storage compute cloud snowpipe streams tasks time travel failsafe data sharing structured semi csv orc encrypted sso oauth mfa' },
    { id: 'airflow-intro',         title: 'Airflow Intro',                      url: 'airflow.html#airflow-intro',             tags: 'airflow orchestration etl 100gb 2gb scheduling workflow monitoring sftp jdbc api' },
    { id: 'airflow-operators',     title: 'Airflow Operators',                  url: 'airflow.html#airflow-operators',         tags: 'airflow operators python bash s3toredshift sql email dummy pysftp jdbc' },
    { id: 'airflow-sensors',       title: 'Airflow Sensors',                    url: 'airflow.html#airflow-sensors',           tags: 'airflow sensors file http sql s3key filesensor httpsensor sqlsensor s3keysensor' },
    { id: 'airflow-dag',           title: 'Airflow DAG Example',                url: 'airflow.html#airflow-dag',               tags: 'airflow dag pythonoperator s3keysensor hooks postgres mysql xcom push pull variables connections bitwise dependencies' },
    { id: 'airflow-catchup',       title: 'Airflow Catchup & Depends',          url: 'airflow.html#airflow-catchup',           tags: 'airflow catchup depends_on_past depends past backfill daily cron' },
    { id: 'airflow-vs-stepfunctions', title: 'Airflow vs Step Functions',      url: 'airflow.html#airflow-vs-stepfunctions',  tags: 'airflow step functions managed serverless orchestration aws native xcom parallel retries' },
    { id: 'git-github',            title: 'Git & GitHub',                       url: 'devops.html#git-github',                 tags: 'git github init add commit push pull clone status log branch checkout stash revert merge conflicts branch protection large files accidental main' },
    { id: 'secrets-manager',       title: 'Secrets Manager',                    url: 'devops.html#secrets-manager',            tags: 'secrets manager credentials aws connections hardcoded' },
    { id: 'status-codes',          title: 'Status Codes',                       url: 'devops.html#status-codes',               tags: 'status codes 100 200 300 400 500 informational success redirection client error server error' }
  ];

  // ---------------------------------------------------------------------------
  //  UTILITIES
  // ---------------------------------------------------------------------------
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function on(el, evt, fn, opts) {
    if (el) el.addEventListener(evt, fn, opts);
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, ms);
    };
  }

  function storage(key, fallback) {
    try { var v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }

  function storageSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* quota exceeded */ }
  }

  function escapeHtml(str) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
  }

  // ---------------------------------------------------------------------------
  //  1. DARK / LIGHT MODE TOGGLE
  // ---------------------------------------------------------------------------
  var ThemeManager = (function () {
    var btn;

    function apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      storageSet(STORAGE_KEYS.theme, theme);
      updateIcon(theme);
    }

    function updateIcon(theme) {
      if (!btn) return;
      var sun  = btn.querySelector('.icon-sun');
      var moon = btn.querySelector('.icon-moon');
      if (sun)  sun.style.display  = theme === 'dark' ? 'none' : 'inline';
      if (moon) moon.style.display = theme === 'dark' ? 'inline' : 'none';
    }

    function init() {
      btn = $('#theme-toggle');
      var current = storage(STORAGE_KEYS.theme, 'dark');
      apply(current);
      on(btn, 'click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.style.transition = 'background-color .3s, color .3s';
        apply(next);
      });
    }

    return { init: init, apply: apply };
  })();

  // ---------------------------------------------------------------------------
  //  2. SEARCH FUNCTIONALITY
  // ---------------------------------------------------------------------------
  var Search = (function () {
    var overlay, input, resultsContainer, isOpen = false;

    function open() {
      if (!overlay) return;
      overlay.classList.add('is-visible');
      overlay.classList.add('is-open');
      overlay.classList.add('active');
      isOpen = true;
      input.value = '';
      resultsContainer.innerHTML = '';
      input.focus();
    }

    function close() {
      if (!overlay) return;
      overlay.classList.remove('is-visible');
      overlay.classList.remove('is-open');
      overlay.classList.remove('active');
      isOpen = false;
      input.value = '';
      resultsContainer.innerHTML = '';
    }

    function query(term) {
      if (!term || term.length < 2) { resultsContainer.innerHTML = ''; return; }
      var lower = term.toLowerCase().replace(/[:\-_]+/g, ' ').replace(/\s+/g, ' ').trim();
      var tokens = lower.split(' ').filter(function (w) { return w.length > 1; });
      // stop-words that should not block a match (e.g. "components: glue can import from multiple sources")
      var stop = { can:1, from:1, the:1, and:1, for:1, with:1, into:1 };
      tokens = tokens.filter(function (w) { return !stop[w]; });
      if (!tokens.length) { resultsContainer.innerHTML = ''; return; }
      var matches = TOPICS.filter(function (t) {
        var hay = (t.title + ' ' + t.tags + ' ' + t.id.replace(/-/g, ' ')).toLowerCase();
        // every significant token must appear (AND); single-token falls back to substring
        for (var i = 0; i < tokens.length; i++) {
          if (hay.indexOf(tokens[i]) === -1) return false;
        }
        return true;
      });
      render(matches, term);
    }

    function highlight(text, term) {
      if (!term) return escapeHtml(text);
      var regex = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      return escapeHtml(text).replace(regex, '<mark>$1</mark>');
    }

    function render(matches, term) {
      if (!matches.length) {
        resultsContainer.innerHTML = '<div class="search-no-results">No results found for "' + escapeHtml(term) + '"</div>';
        return;
      }
      var html = '<ul class="search-results-list">';
      matches.forEach(function (m) {
        html += '<li class="search-result-item">' +
                  '<a href="' + m.url + '">' + highlight(m.title, term) + '</a>' +
                  '<span class="search-result-tags">' + highlight(m.tags, term) + '</span>' +
                '</li>';
      });
      html += '</ul>';
      resultsContainer.innerHTML = html;

      // attach click handlers to navigate & close
      $$('.search-result-item a', resultsContainer).forEach(function (a) {
        on(a, 'click', function () { close(); });
      });
    }

    function init() {
      overlay   = $('#search-overlay');
      input     = $('#search-input');
      resultsContainer = $('#search-results');

      // open triggers
      $$('.search-trigger').forEach(function (el) { on(el, 'click', open); });

      // keyboard shortcut
      on(document, 'keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
        if (e.key === 'Escape' && isOpen) close();
      });

      // input
      on(input, 'input', debounce(function () { query(input.value.trim()); }, 200));

      // close on outside click
      on(overlay, 'click', function (e) { if (e.target === overlay) close(); });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  3. PROGRESS TRACKING
  // ---------------------------------------------------------------------------
  var Progress = (function () {
    var completed = [];

    function load()  { completed = storage(STORAGE_KEYS.completed, []); }
    function save()  { storageSet(STORAGE_KEYS.completed, completed); }

    function toggle(topicId) {
      var idx = completed.indexOf(topicId);
      if (idx === -1) { completed.push(topicId); }
      else            { completed.splice(idx, 1); }
      save();
      render();
      updateButtons();
    }

    function render() {
      var pct    = Math.round((completed.length / TOTAL_TOPICS) * 100);
      var bar    = $('#progress-bar-fill');
      var label  = $('#progress-label');
      if (bar)   bar.style.width = pct + '%';
      if (label) label.textContent = completed.length + ' / ' + TOTAL_TOPICS + ' Topics Completed';
    }

    function updateButtons() {
      $$('.topic-complete-btn').forEach(function (btn) {
        var id = btn.getAttribute('data-topic-id');
        if (completed.indexOf(id) !== -1) {
          btn.classList.add('completed');
          btn.textContent = 'Completed';
        } else {
          btn.classList.remove('completed');
          btn.textContent = 'Mark as Complete';
        }
      });
    }

    function init() {
      load();
      render();
      updateButtons();
      $$('.topic-complete-btn').forEach(function (btn) {
        on(btn, 'click', function () { toggle(btn.getAttribute('data-topic-id')); });
      });
    }

    return { init: init, isCompleted: function (id) { return completed.indexOf(id) !== -1; } };
  })();

  // ---------------------------------------------------------------------------
  //  4. BOOKMARKS
  // ---------------------------------------------------------------------------
  var Bookmarks = (function () {
    var bookmarked = [];

    function load() { bookmarked = storage(STORAGE_KEYS.bookmarks, []); }
    function save() { storageSet(STORAGE_KEYS.bookmarks, bookmarked); }

    function toggle(topicId) {
      var idx = bookmarked.indexOf(topicId);
      if (idx === -1) { bookmarked.push(topicId); }
      else            { bookmarked.splice(idx, 1); }
      save();
      updateButtons();
      renderSidebar();
    }

    function updateButtons() {
      $$('.bookmark-btn').forEach(function (btn) {
        var id = btn.getAttribute('data-topic-id');
        if (bookmarked.indexOf(id) !== -1) {
          btn.classList.add('bookmarked');
          btn.textContent = '★';
        } else {
          btn.classList.remove('bookmarked');
          btn.textContent = '☆';
        }
      });
    }

    function renderSidebar() {
      var panel = $('#bookmarks-list');
      if (!panel) return;
      if (!bookmarked.length) {
        panel.innerHTML = '<p class="bookmarks-empty">No bookmarks yet.</p>';
        return;
      }
      var html = '<ul class="bookmarks-items">';
      bookmarked.forEach(function (id) {
        var topic = TOPICS.find(function (t) { return t.id === id; });
        if (topic) {
          html += '<li class="bookmarks-item">' +
                    '<a href="' + topic.url + '">' + escapeHtml(topic.title) + '</a>' +
                    '<button class="bookmark-remove" data-topic-id="' + id + '">&times;</button>' +
                  '</li>';
        }
      });
      html += '</ul>';
      panel.innerHTML = html;

      $$('.bookmark-remove', panel).forEach(function (btn) {
        on(btn, 'click', function () { toggle(btn.getAttribute('data-topic-id')); });
      });
    }

    function init() {
      load();
      updateButtons();
      renderSidebar();

      $$('.bookmark-btn').forEach(function (btn) {
        on(btn, 'click', function () { toggle(btn.getAttribute('data-topic-id')); });
      });

      // toggle bookmarks panel visibility
      var panel = $('#bookmarks-panel');
      var toggleBtn = $('#bookmarks-toggle');
      if (toggleBtn && panel) {
        on(toggleBtn, 'click', function () { panel.classList.toggle('active'); });
      }
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  5. CODE BLOCK COPY BUTTON
  // ---------------------------------------------------------------------------
  var CodeCopy = (function () {
    function flash(btn, original) {
      var txt = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      btn.classList.add('is-copied');
      setTimeout(function () {
        btn.textContent = original || 'Copy';
        btn.classList.remove('copied');
        btn.classList.remove('is-copied');
      }, 2000);
    }
    function copyText(text, btn, original) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { flash(btn, original); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        flash(btn, original);
      }
    }
    function addCopyButtons() {
      // 1) Wire existing header buttons (.code-block__copy) - keep them away from code in header
      $$('.code-block__copy').forEach(function (btn) {
        if (btn.dataset.bound) return;
        btn.dataset.bound = '1';
        var block = btn.closest('.code-block');
        var code = block ? block.querySelector('pre > code, pre code') : null;
        if (!code) return;
        var original = btn.textContent.trim() || 'Copy';
        on(btn, 'click', function () { copyText(code.textContent, btn, original); });
      });
      // 2) Fallback: blocks without header button - create inside <pre> but padded away from code via CSS
      $$('pre > code').forEach(function (code) {
        var pre = code.parentElement;
        var block = pre.closest('.code-block');
        if (block && block.querySelector('.code-block__copy')) return; // header already handles it
        if (pre.querySelector('.copy-btn')) return;
        pre.style.position = 'relative';
        var btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = 'Copy';
        btn.setAttribute('aria-label', 'Copy code');
        on(btn, 'click', function () { copyText(code.textContent, btn, 'Copy'); });
        pre.appendChild(btn);
      });
    }
    function init() { addCopyButtons(); }
    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  6. MOBILE HAMBURGER MENU
  // ---------------------------------------------------------------------------
  var MobileMenu = (function () {
    var burger, overlay, nav, isOpen = false;

    function open() {
      if (burger) burger.classList.add('is-active');
      if (overlay) overlay.classList.add('is-visible');
      if (nav) {
        nav.classList.add('is-open');
        if (nav.style.transform) nav.style.transform = '';
      }
      document.body.style.overflow = 'hidden';
      isOpen = true;
    }

    function close() {
      if (burger) burger.classList.remove('is-active');
      if (overlay) overlay.classList.remove('is-visible');
      if (nav) nav.classList.remove('is-open');
      document.body.style.overflow = '';
      isOpen = false;
    }

    function init() {
      burger  = $('#hamburger');
      overlay = $('#mobile-overlay');
      nav     = $('#mobile-nav');

      if (burger) on(burger, 'click', function () { isOpen ? close() : open(); });
      if (overlay) on(overlay, 'click', close);

      // close on link click
      if (nav) {
        $$('a', nav).forEach(function (a) {
          on(a, 'click', close);
        });
      }

      // close on Escape
      on(document, 'keydown', function (e) {
        if (e.key === 'Escape' && isOpen) close();
      });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  7. SIDEBAR TOGGLE
  // ---------------------------------------------------------------------------
  var Sidebar = (function () {
    var sidebar, toggleBtn;

    function setState(open) {
      if (!sidebar) return;
      if (open) { sidebar.classList.add('is-open'); }
      else      { sidebar.classList.remove('is-open'); }
      storageSet(STORAGE_KEYS.sidebar, open);
    }

    function init() {
      sidebar  = $('#sidebar');
      toggleBtn = $('#sidebar-toggle');
      var stored = storage(STORAGE_KEYS.sidebar, true);
      setState(stored);

      if (toggleBtn) {
        on(toggleBtn, 'click', function () {
          var isOpen = sidebar.classList.contains('is-open');
          setState(!isOpen);
        });
      }
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  7b. SIDEBAR COLLAPSE (heading icon toggle)
  // ---------------------------------------------------------------------------
  var SidebarCollapse = (function () {
    function init() {
      $$('.sidebar__heading').forEach(function (heading) {
        on(heading, 'click', function () {
          var section = heading.closest('.sidebar__section');
          if (section) section.classList.toggle('is-collapsed');
        });
      });
      var currentFile = location.pathname.split('/').pop() || 'index.html';
      $$('.sidebar__section').forEach(function (section) {
        var links = $$('a', section);
        for (var i = 0; i < links.length; i++) {
          var href = links[i].getAttribute('href') || '';
          var filePart = href.split('#')[0].split('/').pop();
          if (filePart === currentFile) { section.classList.remove('is-collapsed'); break; }
        }
      });
    }
    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  7c. SIDEBAR SMOOTH SCROLL (prevent refresh on same-page anchors)
  // ---------------------------------------------------------------------------
  var SidebarSmoothScroll = (function () {
    function init() {
      var currentFile = location.pathname.split('/').pop() || 'index.html';
      $$('.sidebar__link').forEach(function (link) {
        on(link, 'click', function (e) {
          var href = link.getAttribute('href');
          if (!href || href.indexOf('#') === -1) return;
          var parts = href.split('#');
          var filePart = parts[0];
          var hash = parts[1];
          if (!hash) return;
          var targetFile = filePart ? filePart.split('/').pop() : currentFile;
          if (!targetFile) targetFile = currentFile;
          // same-page anchor: prevent full reload, smooth scroll with fixed header offset
          if (targetFile === currentFile) {
            e.preventDefault();
            var target = document.getElementById(hash);
            if (target) {
              var navHeight = 64;
              try { var cs = getComputedStyle(document.documentElement); var nh = parseInt(cs.getPropertyValue('--nav-height')); if (!isNaN(nh)) navHeight = nh; } catch(e2) {}
              var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
              window.scrollTo({ top: top, behavior: 'smooth' });
              history.pushState(null, '', '#' + hash);
            }
          }
          // cross-page: let browser navigate normally; target page's CSS scroll-margin will handle offset
        });
      });
      // handle initial hash on load with offset (for direct # interview-prep links)
      if (location.hash) {
        var hash = location.hash.substring(1);
        var target = document.getElementById(hash);
        if (target) {
          setTimeout(function () {
            var navHeight = 64;
            try { var cs = getComputedStyle(document.documentElement); var nh = parseInt(cs.getPropertyValue('--nav-height')); if (!isNaN(nh)) navHeight = nh; } catch(e2) {}
            var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
            window.scrollTo({ top: top, behavior: 'auto' });
          }, 100);
        }
      }
    }
    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  8. EXPANDABLE SECTIONS
  // ---------------------------------------------------------------------------
  var Expandable = (function () {
    var states = {};

    function load() { states = storage(STORAGE_KEYS.expandable, {}); }
    function save() { storageSet(STORAGE_KEYS.expandable, states); }

    function toggleSection(id) {
      var el = document.getElementById(id);
      if (!el) return;
      var content = el.querySelector('.expandable-content');
      var icon    = el.querySelector('.expandable-icon');
      if (!content) return;

      var expanded = states[id] === true; // default collapsed

      if (expanded) {
        // collapse
        content.style.maxHeight = content.scrollHeight + 'px';
        requestAnimationFrame(function () {
          content.style.maxHeight = '0';
          content.style.overflow = 'hidden';
          if (icon) icon.style.transform = 'rotate(-90deg)';
        });
        states[id] = false;
      } else {
        // expand
        content.style.overflow = 'hidden';
        content.style.maxHeight = '0';
        requestAnimationFrame(function () {
          content.style.maxHeight = content.scrollHeight + 'px';
          if (icon) icon.style.transform = 'rotate(0deg)';
        });
        states[id] = true;
        // remove max-height after transition so content can resize
        setTimeout(function () { content.style.maxHeight = 'none'; content.style.overflow = ''; }, 400);
      }
      save();
    }

    function init() {
      load();
      $$('.expandable-section').forEach(function (section) {
        var id    = section.id;
        var state = states[id];
        var content = section.querySelector('.expandable-content');
        var icon    = section.querySelector('.expandable-icon');
        if (!content) return;

        if (state === true) {
          content.style.maxHeight = 'none';
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          content.style.maxHeight = '0';
          content.style.overflow = 'hidden';
          if (icon) icon.style.transform = 'rotate(-90deg)';
        }

        var header = section.querySelector('.expandable-header');
        if (header) on(header, 'click', function () { toggleSection(id); });
      });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  9. SCROLL SPY
  // ---------------------------------------------------------------------------
  var ScrollSpy = (function () {
    var sections = [];
    var navLinks = [];

    function update() {
      var scrollY = window.scrollY + 120;
      var current = null;

      sections.forEach(function (sec) {
        if (sec.offsetTop <= scrollY) current = sec;
      });

      var currentFile = location.pathname.split('/').pop() || 'index.html';
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        link.classList.remove('is-active');
        if (!current) return;
        var href = link.getAttribute('href') || '';
        if (href.indexOf('#') === -1) return;
        var parts = href.split('#');
        var filePart = parts[0];
        var hash = parts[1];
        var linkFile = filePart ? filePart.split('/').pop() : currentFile;
        if (!linkFile) linkFile = currentFile;
        if (linkFile === currentFile && hash === current.id) {
          link.classList.add('active');
          link.classList.add('is-active');
        }
      });
    }

    function init() {
      sections = $$('section[id], .topic-section[id], h2[id], h3[id]');
      navLinks = $$('.sidebar-nav a[href*="#"], .sidebar a[href*="#"]');
      if (!sections.length || !navLinks.length) return;

      on(window, 'scroll', debounce(update, 50), { passive: true });
      update();
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  10. INTERACTIVE DIAGRAM CLICK
  // ---------------------------------------------------------------------------
  var DiagramClick = (function () {
    function init() {
      $$('.diagram-component').forEach(function (comp) {
        on(comp, 'click', function () {
          var panelId = comp.getAttribute('data-explain');
          var panel   = panelId ? document.getElementById(panelId) : null;
          // close all panels first
          $$('.diagram-explanation').forEach(function (p) { p.classList.remove('active'); });
          if (panel) {
            panel.classList.add('active');
            comp.classList.add('selected');
          }
        });
      });

      // close panel on close button
      $$('.diagram-close').forEach(function (btn) {
        on(btn, 'click', function () {
          var panel = btn.closest('.diagram-explanation');
          if (panel) panel.classList.remove('active');
          $$('.diagram-component.selected').forEach(function (c) { c.classList.remove('selected'); });
        });
      });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  11. SCENARIO REVEAL
  // ---------------------------------------------------------------------------
  var ScenarioReveal = (function () {
    function init() {
      $$('.scenario-steps').forEach(function (container) {
        var steps   = $$('.scenario-step', container);
        var btn     = container.querySelector('.scenario-next-btn');
        var current = 0;

        // hide all steps initially (CSS also hides, but ensure)
        steps.forEach(function (s) { s.style.display = 'none'; s.classList.remove('is-visible'); });

        if (!steps.length) return;
        // show first step - use both inline block and is-visible for CSS compatibility
        steps[0].style.display = 'block';
        steps[0].classList.add('is-visible');

        if (btn) {
          on(btn, 'click', function () {
            current++;
            if (current >= steps.length) {
              btn.style.display = 'none';
              return;
            }
            steps[current].style.display = 'block';
            steps[current].classList.add('is-visible');
            // update button text on last step
            if (current === steps.length - 1) btn.textContent = 'All Steps Revealed';
          });
        }
      });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  12. INTERSECTION OBSERVER ANIMATIONS
  // ---------------------------------------------------------------------------
  var Animations = (function () {
    function init() {
      if (!('IntersectionObserver' in window)) {
        // fallback: show everything immediately
        $$('.fade-in, .slide-in, .stagger-item').forEach(function (el) {
          el.classList.add('visible');
        });
        return;
      }

      // Staggered cards
      var staggerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var cards = $$('.stagger-item', entry.target);
            cards.forEach(function (card, i) {
              setTimeout(function () { card.classList.add('visible'); }, i * 80);
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      $$('.stagger-container').forEach(function (container) {
        staggerObserver.observe(container);
      });

      // Simple fade-in
      var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      $$('.fade-in, .slide-in').forEach(function (el) {
        fadeObserver.observe(el);
      });
    }

    return { init: init };
  })();

  // ---------------------------------------------------------------------------
  //  INIT ALL
  // ---------------------------------------------------------------------------
  function initAll() {
    ThemeManager.init();
    Search.init();
    Progress.init();
    Bookmarks.init();
    CodeCopy.init();
    MobileMenu.init();
    Sidebar.init();
    SidebarCollapse.init();
    SidebarSmoothScroll.init();
    Expandable.init();
    ScrollSpy.init();
    DiagramClick.init();
    ScenarioReveal.init();
    Animations.init();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
