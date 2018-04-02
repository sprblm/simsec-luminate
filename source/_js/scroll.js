const Scroll = {
  smoothScrolling() {
    // Smooth Scrolling Function
    $('a[href*=\\#]:not([href=\\#])').on('click', e => {
      let $targ = $(e.currentTarget.hash);
      const host1 = e.currentTarget.hostname;
      const host2 = window.location.hostname;
      const path1 = e.currentTarget.pathname.replace(/^\//, '');
      const path2 = window.location.pathname.replace(/^\//, '');
      if (!$targ.length) {
        $targ = $(`[name=${e.currentTarget.hash.slice(1)}]`);
      }
      if ($targ.length && (host1 === host2 || path1 === path2)) {
        $('html, body').animate({ scrollTop: $targ.offset().top }, 1000);
        return false;
      }
      return true;
    });
  },
  init() {
    this.smoothScrolling();
  }
};

module.exports = Scroll;
