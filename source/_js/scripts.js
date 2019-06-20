// import Footer from './Footer';
import Overlay from './overlay';
import Modal from './modal';
import Nav from './nav';
import Scroll from './scroll';
import Search from './search';
import Slider from './slider';
import Sticky from './sticky';
import Utils from './utils';
import FixedDropdown from './fixed-dropdown';
import SlidePage from './slide-page';
import RecommendationsFilter from './recommendations-filter';
import InsightsFilter from './insights-filter';
import NavLinks from './nav-links';
import InternalPageNav from './internal-page-nav';

// Footer.init();
Modal.init();
Nav.init();
Overlay.init();
Scroll.init();
Search.init();
Slider.init();
Sticky.init();
Utils.markdownLinksNewPage();
FixedDropdown.init();
SlidePage.init();
RecommendationsFilter.init();
InsightsFilter.init();
NavLinks.init();

if (window.location.pathname === '/project-details/' || window.location.pathname === '/project-details' || window.location.pathname === '/simsec-luminate/project-details' || window.location.pathname === '/simsec-luminate/project-details/') {
  InternalPageNav.init();
};
