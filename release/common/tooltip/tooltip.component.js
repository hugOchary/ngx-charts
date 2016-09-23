"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var throttle_1 = require('../../utils/throttle');
var position_helper_1 = require('./position.helper');
var tooltip_options_1 = require('./tooltip-options');
var placement_type_1 = require('./placement.type');
var TooltipContentComponent = (function () {
    function TooltipContentComponent(element, options) {
        this.element = element;
        Object.assign(this, options);
    }
    Object.defineProperty(TooltipContentComponent.prototype, "cssClasses", {
        get: function () {
            var clz = 'swui-tooltip-content';
            clz += " position-" + this.placement;
            clz += " type-" + this.type;
            clz += " " + this.cssClass;
            return clz;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipContentComponent.prototype, "visibilityChanged", {
        get: function () {
            return 'active';
        },
        enumerable: true,
        configurable: true
    });
    TooltipContentComponent.prototype.ngAfterViewInit = function () {
        this.position();
    };
    TooltipContentComponent.prototype.position = function () {
        var nativeElm = this.element.nativeElement;
        var hostDim = this.host.nativeElement.getBoundingClientRect();
        var elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret)
            this.positionCaret(hostDim, elmDim);
    };
    TooltipContentComponent.prototype.positionContent = function (nativeElm, hostDim, elmDim) {
        var top = 0;
        var left = 0;
        if (this.placement === placement_type_1.PlacementTypes.right) {
            left = hostDim.left + hostDim.width + this.spacing;
            top = position_helper_1.PositionHelper.calculateVerticalAlignment(hostDim, elmDim, this.alignment);
        }
        else if (this.placement === placement_type_1.PlacementTypes.left) {
            left = hostDim.left - elmDim.width - this.spacing;
            top = position_helper_1.PositionHelper.calculateVerticalAlignment(hostDim, elmDim, this.alignment);
        }
        else if (this.placement === placement_type_1.PlacementTypes.top) {
            top = hostDim.top - elmDim.height - this.spacing;
            left = position_helper_1.PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, this.alignment);
        }
        else if (this.placement === placement_type_1.PlacementTypes.bottom) {
            top = hostDim.top + hostDim.height + this.spacing;
            left = position_helper_1.PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, this.alignment);
        }
        nativeElm.style['top'] = top + 'px';
        nativeElm.style['left'] = left + 'px';
    };
    TooltipContentComponent.prototype.positionCaret = function (hostDim, elmDim) {
        var caretElm = this.caretElm.nativeElement;
        var caretDimensions = caretElm.getBoundingClientRect();
        var top = 0;
        var left = 0;
        if (this.placement === placement_type_1.PlacementTypes.right) {
            left = -7;
            top = position_helper_1.PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, this.alignment);
        }
        else if (this.placement === placement_type_1.PlacementTypes.left) {
            left = elmDim.width;
            top = position_helper_1.PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, this.alignment);
        }
        else if (this.placement === placement_type_1.PlacementTypes.top) {
            top = elmDim.height;
            left = position_helper_1.PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, this.alignment);
        }
        else if (this.placement === placement_type_1.PlacementTypes.bottom) {
            top = -7;
            left = position_helper_1.PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, this.alignment);
        }
        caretElm.style['top'] = top + 'px';
        caretElm.style['left'] = left + 'px';
    };
    TooltipContentComponent.prototype.checkFlip = function (hostDim, elmDim) {
        var shouldFlip = position_helper_1.PositionHelper.shouldFlip(hostDim, elmDim, this.placement, this.alignment, this.spacing);
        if (shouldFlip) {
            if (this.placement === placement_type_1.PlacementTypes.right) {
                this.placement = placement_type_1.PlacementTypes.left;
            }
            else if (this.placement === placement_type_1.PlacementTypes.left) {
                this.placement = placement_type_1.PlacementTypes.right;
            }
            else if (this.placement === placement_type_1.PlacementTypes.top) {
                this.placement = placement_type_1.PlacementTypes.bottom;
            }
            else if (this.placement === placement_type_1.PlacementTypes.bottom) {
                this.placement = placement_type_1.PlacementTypes.top;
            }
        }
    };
    TooltipContentComponent.prototype.onMouseLeave = function (target) {
        if (this.closeOnMouseLeave)
            this.hide();
    };
    TooltipContentComponent.prototype.onDocumentClick = function (target) {
        if (this.closeOnClickOutside) {
            var contains = this.element.nativeElement.contains(target);
            if (!contains)
                this.hide();
        }
    };
    TooltipContentComponent.prototype.onWindowResize = function () {
        this.position();
    };
    __decorate([
        core_1.ViewChild('caretElm'), 
        __metadata('design:type', Object)
    ], TooltipContentComponent.prototype, "caretElm", void 0);
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], TooltipContentComponent.prototype, "cssClasses", null);
    __decorate([
        core_1.HostBinding('@visibilityChanged'), 
        __metadata('design:type', Object)
    ], TooltipContentComponent.prototype, "visibilityChanged", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], TooltipContentComponent.prototype, "onMouseLeave", null);
    __decorate([
        core_1.HostListener('document:click', ['$event.target']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], TooltipContentComponent.prototype, "onDocumentClick", null);
    __decorate([
        core_1.HostListener('window:resize'),
        throttle_1.throttleable(100), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TooltipContentComponent.prototype, "onWindowResize", null);
    TooltipContentComponent = __decorate([
        core_1.Component({
            selector: 'swui-tooltip-content',
            template: "\n    <div>\n      <span\n        #caretElm\n        [hidden]=\"!showCaret\"\n        class=\"tooltip-caret position-{{this.placement}}\">\n      </span>\n      <div class=\"tooltip-content\">\n        <span *ngIf=\"!title\">\n          <template\n            [ngTemplateOutlet]=\"template\"\n            [ngOutletContext]=\"{ model: context }\">\n          </template>\n        </span>\n        <span\n          *ngIf=\"title\"\n          [innerHTML]=\"title\">\n        </span>\n      </div>\n    </div>\n  ",
            animations: [
                core_1.trigger('visibilityChanged', [
                    core_1.state('active', core_1.style({ opacity: 1, 'pointer-events': 'auto' })),
                    core_1.transition('void => *', [
                        core_1.style({
                            opacity: 0,
                            'pointer-events': 'none',
                            transform: 'translate3d(0, 0, 0)'
                        }),
                        core_1.animate('0.3s ease-out')
                    ]),
                    core_1.transition('* => void', [
                        core_1.style({ opacity: 1 }),
                        core_1.animate('0.2s ease-out')
                    ])
                ])
            ]
        }),
        __param(1, core_1.Inject(tooltip_options_1.TooltipOptions)), 
        __metadata('design:paramtypes', [core_1.ElementRef, tooltip_options_1.TooltipOptions])
    ], TooltipContentComponent);
    return TooltipContentComponent;
}());
exports.TooltipContentComponent = TooltipContentComponent;
//# sourceMappingURL=tooltip.component.js.map