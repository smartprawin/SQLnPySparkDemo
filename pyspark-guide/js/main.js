/**
 * PySpark Interview Guide - Main JavaScript
 * Vanilla JS · IIFE Pattern · Production Quality
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  //  CONSTANTS
  // ---------------------------------------------------------------------------
  var TOTAL_TOPICS = 30;
  var STORAGE_KEYS = {
    theme:      'pyspark_theme',
    completed:  'pyspark_completed',
    bookmarks:  'pyspark_bookmarks',
    sidebar:    'pyspark_sidebar_open',
    expandable: 'pyspark_expandable_v2'
  };

  // All searchable topics (id, title, url, content summary) - auto-generated from sidebar
  var TOPICS = [
    // Fundamentals
    { id: 'what-is-spark',         title: 'What is Spark',                      url: 'fundamentals.html#what-is-spark',         tags: 'spark fundamentals apache in-memory distributed' },
    { id: 'what-is-pyspark',       title: 'What is PySpark',                    url: 'fundamentals.html#what-is-pyspark',       tags: 'pyspark python api spark session' },
    { id: 'rdd',                   title: 'RDD - Resilient Distributed Dataset',url: 'fundamentals.html#rdd',                   tags: 'rdd resilient distributed dataset lineage immutability' },
    { id: 'rdd-vs-dataframe-vs-dataset', title: 'RDD vs DataFrame vs Dataset',       url: 'fundamentals.html#rdd-vs-dataframe-vs-dataset', tags: 'rdd dataframe dataset comparison type safe schema catalyst tungsten' },
    { id: 'lazy-evaluation',       title: 'Lazy Evaluation',                    url: 'fundamentals.html#lazy-evaluation',       tags: 'lazy evaluation transformation action lineage' },
    { id: 'transformations-actions',title: 'Transformations vs Actions',        url: 'fundamentals.html#transformations-actions',tags: 'transformations actions map filter collect count' },
    // Execution / Architecture
    { id: 'execution-architecture',title: 'Spark Execution Architecture',       url: 'architecture.html#execution-architecture',tags: 'execution architecture driver cluster manager executor' },
    { id: 'driver',                title: 'Driver Program',                     url: 'architecture.html#driver',                tags: 'driver sparksession sparkcontext scheduler' },
    { id: 'logical-plan',          title: 'Logical Plan',                       url: 'architecture.html#logical-plan',          tags: 'logical plan parse catalyst optimization' },
    { id: 'catalyst',              title: 'Catalyst Optimizer',                 url: 'architecture.html#catalyst',              tags: 'catalyst optimizer predicate pushdown column pruning' },
    { id: 'dag',                   title: 'DAG - Directed Acyclic Graph',       url: 'architecture.html#dag',                   tags: 'dag directed acyclic graph stages tasks' },
    { id: 'stages',                title: 'Stages',                             url: 'architecture.html#stages',                tags: 'stages shuffle boundary tasks' },
    { id: 'tasks-executors',       title: 'Tasks and Executors',                url: 'architecture.html#tasks-executors',       tags: 'tasks executors cores partitions parallelism' },
    { id: 'aqe',                   title: 'Adaptive Query Execution',           url: 'architecture.html#aqe',                   tags: 'aqe adaptive query execution runtime optimization' },
    // Transformations
    { id: 'narrow',                title: 'Narrow Transformation',              url: 'transformations.html#narrow',             tags: 'narrow transformation map filter union no shuffle' },
    { id: 'wide',                  title: 'Wide Transformation',                url: 'transformations.html#wide',               tags: 'wide transformation shuffle groupby join' },
    { id: 'narrow-vs-wide',        title: 'Narrow vs Wide',                     url: 'transformations.html#narrow-vs-wide',     tags: 'narrow wide comparison shuffle performance' },
    { id: 'common-transformations',title: 'Common Transformations',             url: 'transformations.html#common-transformations',tags: 'transformations map filter groupby join' },
    { id: 'actions',               title: 'Actions',                            url: 'transformations.html#actions',            tags: 'actions collect count show take save' },
    { id: 'complete-dag',          title: 'Complete DAG',                       url: 'transformations.html#complete-dag',       tags: 'complete dag example stages tasks' },
    // Programming
    { id: 'sparksession',          title: 'SparkSession - Entry Point',         url: 'programming.html#sparksession',           tags: 'sparksession entry point builder getorcreate' },
    { id: 'rdd-programming',       title: 'RDD - Resilient Distributed Dataset',url: 'programming.html#rdd',                   tags: 'rdd parallelize collect count' },
    { id: 'dataframe',             title: 'Creating a DataFrame',               url: 'programming.html#dataframe',              tags: 'dataframe create spark createdataframe schema' },
    { id: 'read-csv',              title: 'Reading CSV Files',                  url: 'programming.html#read-csv',               tags: 'read csv header inferSchema' },
    { id: 'manual-schema',         title: 'Defining Schema Manually',           url: 'programming.html#manual-schema',          tags: 'schema structtype structfield manual' },
    { id: 'filter',                title: 'Filtering Data',                     url: 'programming.html#filter',                 tags: 'filter where col duration' },
    { id: 'withcolumn',            title: 'withColumn - Create or Replace Columns', url: 'programming.html#withcolumn',        tags: 'withcolumn col maxpulse pulse' },
    { id: 'groupby',               title: 'GroupBy Aggregations',               url: 'programming.html#groupby',                tags: 'groupby agg avg alias department salary' },
    { id: 'sorting',               title: 'Sorting Data',                       url: 'programming.html#sorting',                tags: 'sorting orderby asc desc' },
    { id: 'duplicates',            title: 'Removing Duplicates',                url: 'programming.html#duplicates',             tags: 'duplicates dropduplicates distinct' },
    { id: 'joins-code',            title: 'Joining DataFrames',                 url: 'programming.html#joins-code',             tags: 'join inner orders customers merge' },
    { id: 'window-functions',      title: 'Window Functions',                   url: 'programming.html#window-functions',       tags: 'window row_number rank dense_rank lead lag partitionby' },
    { id: 'spark-sql',             title: 'Spark SQL',                          url: 'programming.html#spark-sql',              tags: 'spark sql createorreplaceTempView query' },
    { id: 'udf',                   title: 'User Defined Functions (UDF)',       url: 'programming.html#udf',                   tags: 'udf user defined function python' },
    { id: 'null-handling',         title: 'Handling Null Values',               url: 'programming.html#null-handling',          tags: 'null fillna dropna isnull' },
    { id: 'conditional',           title: 'Creating Conditional Columns',       url: 'programming.html#conditional',            tags: 'conditional when otherwise salary category' },
    { id: 'cache-persist',         title: 'Cache and Persist',                  url: 'programming.html#cache-persist',          tags: 'cache persist storagelevel memory disk unpersist' },
    { id: 'repartition-coalesce',  title: 'Repartition vs Coalesce',            url: 'programming.html#repartition-coalesce',   tags: 'repartition coalesce shuffle partitions' },
    { id: 'broadcast-join-code',   title: 'Broadcast Join in Practice',         url: 'programming.html#broadcast-join-code',    tags: 'broadcast join small large' },
    { id: 'etl-pipeline',          title: 'ETL Pipeline - Most Important Interview Program', url: 'programming.html#etl-pipeline', tags: 'etl pipeline source transform validate write s3' },
    { id: 'jdbc',                  title: 'JDBC - Database Integration',        url: 'programming.html#jdbc',                   tags: 'jdbc mysql database integration' },
    { id: 's3-etl',                title: 'S3 -> Spark -> Transformation -> S3',url: 'programming.html#s3-etl',                 tags: 's3 etl spark transformation parquet' },
    { id: 'data-skew-code',        title: 'Data Skew - Detection and Solutions',url: 'programming.html#data-skew-code',         tags: 'data skew salting aqe detection' },
    { id: 'accumulators',          title: 'Accumulators',                       url: 'programming.html#accumulators',           tags: 'accumulators longaccumulator bad records' },
    { id: 'catalyst-code',         title: 'Catalyst Optimizer',                 url: 'programming.html#catalyst-code',          tags: 'catalyst optimizer logical physical plan' },
    { id: 'aqe-code',              title: 'Adaptive Query Execution (AQE)',     url: 'programming.html#aqe-code',               tags: 'aqe adaptive runtime statistics' },
    { id: 'explain',               title: 'Using explain() - Interview Essential', url: 'programming.html#explain',            tags: 'explain plan dag catalyst' },
    { id: 'checklist',             title: 'Interview Coding Checklist',         url: 'programming.html#checklist',              tags: 'checklist coding interview' },
    { id: 'scenarios-code',        title: 'Production Interview Scenarios',     url: 'programming.html#scenarios-code',         tags: 'scenarios production interview' },
    // Partitions
    { id: 'partition-basics',      title: 'What are Partitions?',               url: 'partitions.html#partition-basics',        tags: 'partitions basics parallel tasks' },
    { id: 'horizontal',            title: 'Horizontal Partitioning',            url: 'partitions.html#horizontal',              tags: 'horizontal partitioning rows' },
    { id: 'vertical',              title: 'Vertical Partitioning',              url: 'partitions.html#vertical',                tags: 'vertical partitioning columns' },
    { id: 'hash-partitioning',     title: 'Hash Partitioning',                  url: 'partitions.html#hash-partitioning',       tags: 'hash partitioning hash key mod' },
    { id: 'range-partitioning',    title: 'Range Partitioning',                 url: 'partitions.html#range-partitioning',      tags: 'range partitioning 0-100 101-200' },
    { id: 'round-robin',           title: 'Round-Robin Partitioning',           url: 'partitions.html#round-robin',             tags: 'round robin sequential distribution' },
    { id: 'custom-partitioning',   title: 'Custom Partitioning',                url: 'partitions.html#custom-partitioning',     tags: 'custom partitioning logic' },
    { id: 'repartition-coalesce-part', title: 'Repartition vs Coalesce',       url: 'partitions.html#repartition-coalesce',    tags: 'repartition coalesce shuffle' },
    // Joins
    { id: 'sample-tables',            title: 'Sample Tables - Simple Data',          url: 'joins.html#sample-tables',             tags: 'sample tables employees departments simple data' },
    { id: 'join-types',            title: 'Spark Join Types',                   url: 'joins.html#join-types',                   tags: 'join types inner left right outer semi anti' },
    { id: 'broadcast-join',        title: 'Broadcast Join',                     url: 'joins.html#broadcast-join',               tags: 'broadcast join small dimension shuffle' },
    { id: 'sort-merge-join',       title: 'Sort-Merge Join',                    url: 'joins.html#sort-merge-join',              tags: 'sort merge join large partition sort' },
    { id: 'join-optimization',     title: 'Join Optimization Tips',             url: 'joins.html#join-optimization',            tags: 'join optimization broadcast hint partition skew' },
    // Performance
    { id: 'shuffle',               title: 'Shuffle',                            url: 'performance.html#shuffle',                 tags: 'shuffle wide transformation exchange' },
    { id: 'data-skew',             title: 'Data Skewness',                      url: 'performance.html#data-skew',              tags: 'data skew uneven workload oom' },
    { id: 'salting',               title: 'Salting Technique',                  url: 'performance.html#salting',                tags: 'salting random prefix skewed key' },
    { id: 'cache',                 title: 'Cache',                              url: 'performance.html#cache',                  tags: 'cache memory reuse' },
    { id: 'persist',               title: 'Persist',                            url: 'performance.html#persist',                tags: 'persist storagelevel memory disk ser' },
    { id: 'optimization-checklist',title: 'Performance Optimization Checklist', url: 'performance.html#optimization-checklist',  tags: 'optimization checklist shuffle cache broadcast' },
    { id: 'catalyst-optimizer',    title: 'Catalyst Optimizer',                 url: 'performance.html#catalyst-optimizer',     tags: 'catalyst optimizer predicate pushdown' },
    { id: 'aqe-optimization',      title: 'Adaptive Query Execution (AQE)',     url: 'performance.html#aqe-optimization',       tags: 'aqe adaptive runtime coalesce broadcast skew' },
    // Real-World
    { id: 'real-world-problems',   title: 'Real-World Spark Problems & Solutions', url: 'real-world.html#real-world-problems', tags: 'real world problems skew oom slow small files driver' },
    { id: 'execution-modes',       title: 'Spark Execution Modes',              url: 'real-world.html#execution-modes',         tags: 'execution modes local standalone yarn kubernetes' },
    // Interview
    { id: 'interview-prep',        title: 'Interview Preparation',              url: 'interview.html#interview-prep',            tags: 'interview preparation overview' },
    { id: 'beginner',              title: 'Beginner Questions',                 url: 'interview.html#beginner',                 tags: 'beginner spark pyspark rdd partition transformation action lazy' },
    { id: 'intermediate',          title: 'Intermediate Questions',             url: 'interview.html#intermediate',             tags: 'intermediate narrow wide shuffle dag stage task hash range cache persist broadcast' },
    { id: 'advanced',              title: 'Advanced Questions',                 url: 'interview.html#advanced',                 tags: 'advanced skew salting sort-merge catalyst aqe optimization' },
    { id: 'scenarios',             title: 'Real-World Spark Interview Simulator', url: 'interview.html#scenarios',             tags: 'scenarios slow job skew oom driver small files joins' }
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
      isOpen = true;
      input.value = '';
      resultsContainer.innerHTML = '';
      input.focus();
    }

    function close() {
      if (!overlay) return;
      overlay.classList.remove('is-visible');
      isOpen = false;
      input.value = '';
      resultsContainer.innerHTML = '';
    }

    function query(term) {
      if (!term || term.length < 2) { resultsContainer.innerHTML = ''; return; }
      var lower = term.toLowerCase();
      var matches = TOPICS.filter(function (t) {
        return t.title.toLowerCase().indexOf(lower) !== -1 ||
               t.tags.toLowerCase().indexOf(lower) !== -1;
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
