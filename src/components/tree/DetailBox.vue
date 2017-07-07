<template>
    <div id="overlayDiv" class="baby_overlay" style="top: 40px; left: 545.5px; opacity: 1;  padding-bottom: 0px;">
        <div id="overlayContent" class="content round clearfix" style="height: 500px;">
            <a id="overlayDivCloseBtn" class="close"></a>
            <div id="overlayDetailDiv" class="details">
                <div class="apiDetail">
                    <div class="biaoti">
                        <div id="property-edit">编辑</div>
                        <h2 id="property-name"></h2>
                    </div>
                    <div class="desc" id="property-desc">
                    </div>
                </div>
                <div class="apiDetail" style="display:none;">
                    <div class="biaoti">
                        <div id="property-preview">预览</div>
                        <h2><input id="property-name-input" value="" /></h2>
                    </div>
                    <div id="property-textarea">
                        <textarea class="input_z"></textarea>
                    </div>
                    <button id="property-save">保存</button>
                </div>
            </div>
        </div>
        <div id="overlayDivArrow" class="baby_overlay_arrow" style="top:100px;"></div>
    </div>
</template>