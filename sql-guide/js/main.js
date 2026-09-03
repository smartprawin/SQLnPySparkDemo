/**
 * PySpark Interview Guide - Main JavaScript
 * Vanilla JS · IIFE Pattern · Production Quality
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  //  CONSTANTS
  // ---------------------------------------------------------------------------
  var TOTAL_TOPICS = 77;
  var STORAGE_KEYS = {
    theme:      'pyspark_theme',
    completed:  'pyspark_completed',
    bookmarks:  'pyspark_bookmarks',
    sidebar:    'pyspark_sidebar_open',
    expandable: 'pyspark_expandable_v2'
  };

  // All searchable topics (id, title, url, content summary) - SQL Mastery
  var TOPICS = [
    { id: 'what-is-sql',           title: 'What is SQL',                        url: 'fundamentals.html#what-is-sql',          tags: 'sql structured query language relational' },
    { id: 'what-is-database',      title: 'What is Database',                   url: 'fundamentals.html#what-is-database',     tags: 'database organized collection employees departments' },
    { id: 'tables',                title: 'Tables - Rows & Columns',            url: 'fundamentals.html#tables',               tags: 'tables rows columns employees' },
    { id: 'sql-vs-nosql',          title: 'SQL vs NoSQL',                       url: 'fundamentals.html#sql-vs-nosql',         tags: 'sql nosql relational non-relational mongodb' },
    { id: 'keys',                  title: 'Database Keys',                      url: 'fundamentals.html#keys',                 tags: 'keys primary foreign candidate composite natural surrogate' },
    { id: 'constraints',           title: 'Constraints',                        url: 'fundamentals.html#constraints',          tags: 'constraints primary unique not null check default' },
    { id: 'practice-db',           title: 'Practice Database',                  url: 'fundamentals.html#practice-db',          tags: 'practice employees departments jobs job_history' },
    { id: 'select',                title: 'SELECT',                             url: 'basics.html#select',                     tags: 'select columns alias distinct' },
    { id: 'where',                 title: 'WHERE Filtering',                    url: 'basics.html#where',                      tags: 'where filter and or not salary' },
    { id: 'distinct',              title: 'DISTINCT',                           url: 'basics.html#distinct',                   tags: 'distinct unique' },
    { id: 'order-by',              title: 'ORDER BY',                           url: 'basics.html#order-by',                   tags: 'order by asc desc salary' },
    { id: 'limit',                 title: 'LIMIT / TOP',                        url: 'basics.html#limit',                      tags: 'limit top order by salary' },
    { id: 'like',                  title: 'LIKE Wildcards',                     url: 'basics.html#like',                       tags: 'like wildcard percent underscore' },
    { id: 'in',                    title: 'IN',                                 url: 'basics.html#in',                         tags: 'in department' },
    { id: 'between',               title: 'BETWEEN',                            url: 'basics.html#between',                    tags: 'between salary inclusive' },
    { id: 'null',                  title: 'NULL',                               url: 'basics.html#null',                       tags: 'null is null is not null manager' },
    { id: 'crud',                  title: 'CRUD',                               url: 'crud.html#crud',                         tags: 'crud create read update delete' },
    { id: 'insert',                title: 'INSERT',                             url: 'crud.html#insert',                       tags: 'insert values employees' },
    { id: 'update',                title: 'UPDATE',                             url: 'crud.html#update',                       tags: 'update set where salary' },
    { id: 'delete',                title: 'DELETE',                             url: 'crud.html#delete',                       tags: 'delete where' },
    { id: 'aggregate',             title: 'Aggregate Functions',                url: 'functions.html#aggregate',               tags: 'aggregate count sum avg min max' },
    { id: 'group-by',              title: 'GROUP BY',                           url: 'functions.html#group-by',                tags: 'group by department avg' },
    { id: 'having',                title: 'HAVING',                             url: 'functions.html#having',                  tags: 'having filter groups avg' },
    { id: 'where-vs-having',       title: 'WHERE vs HAVING',                    url: 'functions.html#where-vs-having',         tags: 'where having rows groups' },
    { id: 'sample-tables',        title: 'Sample Tables - Simple Data',          url: 'joins.html#sample-tables',             tags: 'sample tables employees departments simple data' },
    { id: 'why-join',              title: 'Why JOIN',                           url: 'joins.html#why-join',                    tags: 'join why employees departments' },
    { id: 'inner-join',            title: 'INNER JOIN',                         url: 'joins.html#inner-join',                  tags: 'inner join matching' },
    { id: 'left-join',             title: 'LEFT JOIN',                          url: 'joins.html#left-join',                   tags: 'left join departments employees' },
    { id: 'right-join',            title: 'RIGHT JOIN',                         url: 'joins.html#right-join',                  tags: 'right join' },
    { id: 'full-outer-join',       title: 'FULL OUTER JOIN',                    url: 'joins.html#full-outer-join',             tags: 'full outer join union' },
    { id: 'self-join',             title: 'SELF JOIN',                          url: 'joins.html#self-join',                   tags: 'self join employee manager' },
    { id: 'cross-join',            title: 'CROSS JOIN',                         url: 'joins.html#cross-join',                  tags: 'cross join teams cartesian' },
    { id: 'multi-join',            title: 'Multi-Table JOIN',                   url: 'joins.html#multi-join',                  tags: 'multi join employees departments jobs' },
    { id: 'subquery',              title: 'Subqueries',                         url: 'subqueries.html#subquery',               tags: 'subquery avg salary' },
    { id: 'second-highest',        title: 'Second Highest Salary',              url: 'subqueries.html#second-highest',         tags: 'second highest salary max dense_rank' },
    { id: 'cte',                   title: 'CTE',                                url: 'subqueries.html#cte',                    tags: 'cte with high salary' },
    { id: 'window-intro',          title: 'Window Functions Intro',             url: 'window.html#window-intro',               tags: 'window functions without collapsing' },
    { id: 'group-by-vs-window',    title: 'GROUP BY vs Window',                url: 'window.html#group-by-vs-window',         tags: 'group by window partition' },
    { id: 'row-number',            title: 'ROW_NUMBER',                         url: 'window.html#row-number',                 tags: 'row_number unique' },
    { id: 'rank',                  title: 'RANK',                               url: 'window.html#rank',                       tags: 'rank gaps ties' },
    { id: 'dense-rank',            title: 'DENSE_RANK',                         url: 'window.html#dense-rank',                 tags: 'dense_rank no gaps' },
    { id: 'partition-by',          title: 'PARTITION BY',                       url: 'window.html#partition-by',               tags: 'partition by department rank' },
    { id: 'lag',                   title: 'LAG',                                url: 'window.html#lag',                        tags: 'lag previous salary hire_date' },
    { id: 'lead',                  title: 'LEAD',                               url: 'window.html#lead',                       tags: 'lead next salary' },
    { id: 'running-total',         title: 'Running Total',                      url: 'window.html#running-total',              tags: 'running total sum partition order' },
    { id: 'execution-order',       title: 'SQL Execution Order',                url: 'advanced.html#execution-order',          tags: 'execution order from join where group by having select' },
    { id: 'case',                  title: 'CASE Statement',                     url: 'advanced.html#case',                     tags: 'case when then else salary category' },
    { id: 'views',                 title: 'Views',                              url: 'advanced.html#views',                    tags: 'views create view high salary' },
    { id: 'materialized-views',    title: 'Materialized Views',                 url: 'advanced.html#materialized-views',       tags: 'materialized views vs view' },
    { id: 'stored-procedures',     title: 'Stored Procedures',                  url: 'advanced.html#stored-procedures',        tags: 'stored procedures update salary' },
    { id: 'delete-vs-truncate-vs-drop', title: 'DELETE vs TRUNCATE vs DROP',  url: 'advanced.html#delete-vs-truncate-vs-drop',tags: 'delete truncate drop where' },
    { id: 'indexing',              title: 'Indexing',                           url: 'performance.html#indexing',               tags: 'indexing create index department' },
    { id: 'optimization',          title: 'Query Optimization',                 url: 'performance.html#optimization',           tags: 'optimization indexes explain' },
    { id: 'explain',               title: 'EXPLAIN',                            url: 'performance.html#explain',                tags: 'explain execution plan' },
    { id: 'partitioning',          title: 'Partitioning',                       url: 'performance.html#partitioning',           tags: 'partitioning orders 2023 range' },
    { id: 'sharding',              title: 'Sharding',                           url: 'performance.html#sharding',               tags: 'sharding distribute nodes' },
    { id: 'data-modeling',         title: 'Data Modeling',                      url: 'modeling.html#data-modeling',            tags: 'data modeling conceptual logical physical' },
    { id: 'normalization',         title: 'Normalization',                      url: 'modeling.html#normalization',            tags: 'normalization 1nf 2nf 3nf' },
    { id: '1nf',                   title: '1NF',                                url: 'modeling.html#1nf',                      tags: '1nf atomic courses' },
    { id: '2nf',                   title: '2NF',                                url: 'modeling.html#2nf',                      tags: '2nf partial dependency composite' },
    { id: '3nf',                   title: '3NF',                                url: 'modeling.html#3nf',                      tags: '3nf transitive dependency department' },
    { id: 'oltp-vs-olap',          title: 'OLTP vs OLAP',                       url: 'modeling.html#oltp-vs-olap',             tags: 'oltp olap transactional analytical' },
    { id: 'fact-dimension',        title: 'Fact & Dimension Tables',            url: 'modeling.html#fact-dimension',           tags: 'fact dimension sales customer' },
    { id: 'star-schema',           title: 'Star Schema',                        url: 'modeling.html#star-schema',              tags: 'star schema fact dimension sales' },
    { id: 'snowflake-schema',      title: 'Snowflake Schema',                   url: 'modeling.html#snowflake-schema',         tags: 'snowflake schema normalized' },
    { id: 'beginner',              title: 'Beginner Interview Questions',       url: 'interview.html#beginner',                tags: 'beginner interview sql database' },
    { id: 'intermediate',          title: 'Intermediate Interview Questions',   url: 'interview.html#intermediate',            tags: 'intermediate join second highest cte' },
    { id: 'advanced',              title: 'Advanced Interview Questions',       url: 'interview.html#advanced',                tags: 'advanced rank lag lead execution' },
    { id: 'framework',             title: 'Problem-Solving Framework',          url: 'interview.html#framework',               tags: 'framework output tables join filter' },
    { id: 'cheat-sheet',           title: 'SQL Cheat Sheet',                    url: 'interview.html#cheat-sheet',             tags: 'cheat sheet filtering aggregation joins' },
    { id: 'basic-exercises',       title: 'Basic SQL Exercises (1-8)',          url: 'exercises.html#basic-exercises',         tags: 'exercises basic select where order by limit' },
    { id: 'intermediate-exercises',title: 'Intermediate SQL Exercises (9-20)',  url: 'exercises.html#intermediate-exercises',  tags: 'exercises intermediate join subquery exists union case coalesce' },
    { id: 'advanced-exercises',    title: 'Advanced SQL Exercises (21-40)',     url: 'exercises.html#advanced-exercises',      tags: 'exercises advanced window rank lag lead cte pivot merge view procedure' },
    { id: 'ex1',                   title: 'Exercise 1 - Select All Columns',    url: 'exercises.html#ex1',                     tags: 'exercise select all employees' },
    { id: 'ex9',                   title: 'Exercise 9 - INNER JOIN',            url: 'exercises.html#ex9',                     tags: 'exercise inner join employees departments' },
    { id: 'ex14',                  title: 'Exercise 14 - Subquery',             url: 'exercises.html#ex14',                    tags: 'exercise subquery avg salary' },
    { id: 'ex21',                  title: 'Exercise 21 - ROW_NUMBER',           url: 'exercises.html#ex21',                    tags: 'exercise row_number window partition' },
    { id: 'ex29',                  title: 'Exercise 29 - CTE',                  url: 'exercises.html#ex29',                    tags: 'exercise cte avg salary' },
    { id: 'ex36',                  title: 'Exercise 36 - Create View',          url: 'exercises.html#ex36',                    tags: 'exercise view employee_details' }
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
      var current = storage(STORAGE_KEYS.theme, 'light');
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
      if (nav) nav.classList.add('is-open');
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
