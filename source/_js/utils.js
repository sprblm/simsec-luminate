const Utils = {
  markdownLinksNewPage: () => {
    $('.markdown a').map((idx, link) => {
      return link.setAttribute('target', '_blank');
    });
  }
};

module.exports = Utils;
