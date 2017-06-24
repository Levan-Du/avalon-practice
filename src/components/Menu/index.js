import avalon, { component } from 'avalon2';
import './index.css';
import { menus, submenus } from '../../route.config';


var submenuArr = {};
menus.forEach((m) => {
    submenuArr[m.id] = submenus.filter(s => s.pid === m.id && s.id !== 0);
});
var selectedSubMenuItem = submenuArr[1][0];

component('ms-menu', {
    template: require('./index.html'),
    defaults: {
        menus,
        submenus: submenus.filter(s => s.id !== 0),
        submenuArr,
        selectedSubMenuItem,
        menuItemClick(e, item) {
            var preIndex = this.menus.findIndex(el => el.checked);
            var currIndex = this.menus.findIndex(el => item.id === el.id);

            this.menus[currIndex].checked = preIndex > 0 && preIndex === currIndex ? !this.menus[preIndex].checked : true;
            if (preIndex >= 0) {
                this.menus[preIndex].checked = false;
            }
        },
        subMenuItemClick(e) {
            var prePid = this.selectedSubMenuItem.pid,
                currItem = this.submenus.find(el => el.path === e.to);

            var preIndex = this.submenuArr[prePid].findIndex(el => el.checked);
            var currIndex = this.submenuArr[currItem.pid].findIndex(el => currItem.id === el.id);

            if (preIndex >= 0) {
                this.submenuArr[prePid][preIndex].checked = false;
            }
            this.submenuArr[currItem.pid][currIndex].checked = true;
            this.selectedSubMenuItem = this.submenuArr[currItem.pid][currIndex];
        },
        onInit(e) {
            
        },
        onReady(e) {

        }
    }
})
