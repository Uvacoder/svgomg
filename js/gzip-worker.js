!function(){"use strict";var t={},e={};!function(t){var e="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;function a(t,e){return Object.prototype.hasOwnProperty.call(t,e)}t.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var n=e.shift();if(n){if("object"!=typeof n)throw new TypeError(n+"must be non-object");for(var r in n)a(n,r)&&(t[r]=n[r])}}return t},t.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,a,n,r){if(e.subarray&&t.subarray)t.set(e.subarray(a,a+n),r);else for(var i=0;i<n;i++)t[r+i]=e[a+i]},flattenChunks:function(t){var e,a,n,r,i,s;for(n=0,e=0,a=t.length;e<a;e++)n+=t[e].length;for(s=new Uint8Array(n),r=0,e=0,a=t.length;e<a;e++)i=t[e],s.set(i,r),r+=i.length;return s}},r={arraySet:function(t,e,a,n,r){for(var i=0;i<n;i++)t[r+i]=e[a+i]},flattenChunks:function(t){return[].concat.apply([],t)}};t.setTyped=function(e){e?(t.Buf8=Uint8Array,t.Buf16=Uint16Array,t.Buf32=Int32Array,t.assign(t,n)):(t.Buf8=Array,t.Buf16=Array,t.Buf32=Array,t.assign(t,r))},t.setTyped(e)}(e);var a={},n=e;function r(t){for(var e=t.length;--e>=0;)t[e]=0}var i=256,s=286,h=30,l=15,_=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],o=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],d=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],u=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],f=new Array(576);r(f);var c=new Array(60);r(c);var g=new Array(512);r(g);var p=new Array(256);r(p);var b=new Array(29);r(b);var v,w,m,y=new Array(h);function k(t,e,a,n,r){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=n,this.max_length=r,this.has_stree=t&&t.length}function z(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function x(t){return t<256?g[t]:g[256+(t>>>7)]}function B(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function A(t,e,a){t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,B(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)}function C(t,e,a){A(t,a[2*e],a[2*e+1])}function S(t,e){var a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1}function E(t,e,a){var n,r,i=new Array(16),s=0;for(n=1;n<=l;n++)i[n]=s=s+a[n-1]<<1;for(r=0;r<=e;r++){var h=t[2*r+1];0!==h&&(t[2*r]=S(i[h]++,h))}}function j(t){var e;for(e=0;e<s;e++)t.dyn_ltree[2*e]=0;for(e=0;e<h;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function U(t){t.bi_valid>8?B(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function I(t,e,a,n){var r=2*e,i=2*a;return t[r]<t[i]||t[r]===t[i]&&n[e]<=n[a]}function D(t,e,a){for(var n=t.heap[a],r=a<<1;r<=t.heap_len&&(r<t.heap_len&&I(e,t.heap[r+1],t.heap[r],t.depth)&&r++,!I(e,n,t.heap[r],t.depth));)t.heap[a]=t.heap[r],a=r,r<<=1;t.heap[a]=n}function O(t,e,a){var n,r,s,h,l=0;if(0!==t.last_lit)do{n=t.pending_buf[t.d_buf+2*l]<<8|t.pending_buf[t.d_buf+2*l+1],r=t.pending_buf[t.l_buf+l],l++,0===n?C(t,r,e):(C(t,(s=p[r])+i+1,e),0!==(h=_[s])&&A(t,r-=b[s],h),C(t,s=x(--n),a),0!==(h=o[s])&&A(t,n-=y[s],h))}while(l<t.last_lit);C(t,256,e)}function T(t,e){var a,n,r,i=e.dyn_tree,s=e.stat_desc.static_tree,h=e.stat_desc.has_stree,_=e.stat_desc.elems,o=-1;for(t.heap_len=0,t.heap_max=573,a=0;a<_;a++)0!==i[2*a]?(t.heap[++t.heap_len]=o=a,t.depth[a]=0):i[2*a+1]=0;for(;t.heap_len<2;)i[2*(r=t.heap[++t.heap_len]=o<2?++o:0)]=1,t.depth[r]=0,t.opt_len--,h&&(t.static_len-=s[2*r+1]);for(e.max_code=o,a=t.heap_len>>1;a>=1;a--)D(t,i,a);r=_;do{a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],D(t,i,1),n=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=n,i[2*r]=i[2*a]+i[2*n],t.depth[r]=(t.depth[a]>=t.depth[n]?t.depth[a]:t.depth[n])+1,i[2*a+1]=i[2*n+1]=r,t.heap[1]=r++,D(t,i,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],function(t,e){var a,n,r,i,s,h,_=e.dyn_tree,o=e.max_code,d=e.stat_desc.static_tree,u=e.stat_desc.has_stree,f=e.stat_desc.extra_bits,c=e.stat_desc.extra_base,g=e.stat_desc.max_length,p=0;for(i=0;i<=l;i++)t.bl_count[i]=0;for(_[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;a<573;a++)(i=_[2*_[2*(n=t.heap[a])+1]+1]+1)>g&&(i=g,p++),_[2*n+1]=i,n>o||(t.bl_count[i]++,s=0,n>=c&&(s=f[n-c]),h=_[2*n],t.opt_len+=h*(i+s),u&&(t.static_len+=h*(d[2*n+1]+s)));if(0!==p){do{for(i=g-1;0===t.bl_count[i];)i--;t.bl_count[i]--,t.bl_count[i+1]+=2,t.bl_count[g]--,p-=2}while(p>0);for(i=g;0!==i;i--)for(n=t.bl_count[i];0!==n;)(r=t.heap[--a])>o||(_[2*r+1]!==i&&(t.opt_len+=(i-_[2*r+1])*_[2*r],_[2*r+1]=i),n--)}}(t,e),E(i,o,t.bl_count)}function H(t,e,a){var n,r,i=-1,s=e[1],h=0,l=7,_=4;for(0===s&&(l=138,_=3),e[2*(a+1)+1]=65535,n=0;n<=a;n++)r=s,s=e[2*(n+1)+1],++h<l&&r===s||(h<_?t.bl_tree[2*r]+=h:0!==r?(r!==i&&t.bl_tree[2*r]++,t.bl_tree[32]++):h<=10?t.bl_tree[34]++:t.bl_tree[36]++,h=0,i=r,0===s?(l=138,_=3):r===s?(l=6,_=3):(l=7,_=4))}function L(t,e,a){var n,r,i=-1,s=e[1],h=0,l=7,_=4;for(0===s&&(l=138,_=3),n=0;n<=a;n++)if(r=s,s=e[2*(n+1)+1],!(++h<l&&r===s)){if(h<_)do{C(t,r,t.bl_tree)}while(0!=--h);else 0!==r?(r!==i&&(C(t,r,t.bl_tree),h--),C(t,16,t.bl_tree),A(t,h-3,2)):h<=10?(C(t,17,t.bl_tree),A(t,h-3,3)):(C(t,18,t.bl_tree),A(t,h-11,7));h=0,i=r,0===s?(l=138,_=3):r===s?(l=6,_=3):(l=7,_=4)}}r(y);var M=!1;function R(t,e,a,r){A(t,0+(r?1:0),3),function(t,e,a,r){U(t),r&&(B(t,a),B(t,~a)),n.arraySet(t.pending_buf,t.window,e,a,t.pending),t.pending+=a}(t,e,a,!0)}a._tr_init=function(t){M||(!function(){var t,e,a,n,r,i=new Array(16);for(a=0,n=0;n<28;n++)for(b[n]=a,t=0;t<1<<_[n];t++)p[a++]=n;for(p[a-1]=n,r=0,n=0;n<16;n++)for(y[n]=r,t=0;t<1<<o[n];t++)g[r++]=n;for(r>>=7;n<h;n++)for(y[n]=r<<7,t=0;t<1<<o[n]-7;t++)g[256+r++]=n;for(e=0;e<=l;e++)i[e]=0;for(t=0;t<=143;)f[2*t+1]=8,t++,i[8]++;for(;t<=255;)f[2*t+1]=9,t++,i[9]++;for(;t<=279;)f[2*t+1]=7,t++,i[7]++;for(;t<=287;)f[2*t+1]=8,t++,i[8]++;for(E(f,287,i),t=0;t<h;t++)c[2*t+1]=5,c[2*t]=S(t,5);v=new k(f,_,257,s,l),w=new k(c,o,0,h,l),m=new k(new Array(0),d,0,19,7)}(),M=!0),t.l_desc=new z(t.dyn_ltree,v),t.d_desc=new z(t.dyn_dtree,w),t.bl_desc=new z(t.bl_tree,m),t.bi_buf=0,t.bi_valid=0,j(t)},a._tr_stored_block=R,a._tr_flush_block=function(t,e,a,n){var r,s,h=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,a=4093624447;for(e=0;e<=31;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<i;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0}(t)),T(t,t.l_desc),T(t,t.d_desc),h=function(t){var e;for(H(t,t.dyn_ltree,t.l_desc.max_code),H(t,t.dyn_dtree,t.d_desc.max_code),T(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*u[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),r=t.opt_len+3+7>>>3,(s=t.static_len+3+7>>>3)<=r&&(r=s)):r=s=a+5,a+4<=r&&-1!==e?R(t,e,a,n):4===t.strategy||s===r?(A(t,2+(n?1:0),3),O(t,f,c)):(A(t,4+(n?1:0),3),function(t,e,a,n){var r;for(A(t,e-257,5),A(t,a-1,5),A(t,n-4,4),r=0;r<n;r++)A(t,t.bl_tree[2*u[r]+1],3);L(t,t.dyn_ltree,e-1),L(t,t.dyn_dtree,a-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,h+1),O(t,t.dyn_ltree,t.dyn_dtree)),j(t),n&&U(t)},a._tr_tally=function(t,e,a){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&a,t.last_lit++,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(p[a]+i+1)]++,t.dyn_dtree[2*x(e)]++),t.last_lit===t.lit_bufsize-1},a._tr_align=function(t){A(t,2,3),C(t,256,f),function(t){16===t.bi_valid?(B(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}(t)};var K=function(t,e,a,n){for(var r=65535&t|0,i=t>>>16&65535|0,s=0;0!==a;){a-=s=a>2e3?2e3:a;do{i=i+(r=r+e[n++]|0)|0}while(--s);r%=65521,i%=65521}return r|i<<16|0};var N=function(){for(var t,e=[],a=0;a<256;a++){t=a;for(var n=0;n<8;n++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}();var P,q={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},F=e,G=a,J=K,Q=function(t,e,a,n){var r=N,i=n+a;t^=-1;for(var s=n;s<i;s++)t=t>>>8^r[255&(t^e[s])];return-1^t},V=q,W=-2,X=258,Y=262,Z=103,$=113,tt=666;function et(t,e){return t.msg=V[e],e}function at(t){return(t<<1)-(t>4?9:0)}function nt(t){for(var e=t.length;--e>=0;)t[e]=0}function rt(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(F.arraySet(t.output,e.pending_buf,e.pending_out,a,t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))}function it(t,e){G._tr_flush_block(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,rt(t.strm)}function st(t,e){t.pending_buf[t.pending++]=e}function ht(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function lt(t,e){var a,n,r=t.max_chain_length,i=t.strstart,s=t.prev_length,h=t.nice_match,l=t.strstart>t.w_size-Y?t.strstart-(t.w_size-Y):0,_=t.window,o=t.w_mask,d=t.prev,u=t.strstart+X,f=_[i+s-1],c=_[i+s];t.prev_length>=t.good_match&&(r>>=2),h>t.lookahead&&(h=t.lookahead);do{if(_[(a=e)+s]===c&&_[a+s-1]===f&&_[a]===_[i]&&_[++a]===_[i+1]){i+=2,a++;do{}while(_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&i<u);if(n=X-(u-i),i=u-X,n>s){if(t.match_start=e,s=n,n>=h)break;f=_[i+s-1],c=_[i+s]}}}while((e=d[e&o])>l&&0!=--r);return s<=t.lookahead?s:t.lookahead}function _t(t){var e,a,n,r,i,s,h,l,_,o,d=t.w_size;do{if(r=t.window_size-t.lookahead-t.strstart,t.strstart>=d+(d-Y)){F.arraySet(t.window,t.window,d,d,0),t.match_start-=d,t.strstart-=d,t.block_start-=d,e=a=t.hash_size;do{n=t.head[--e],t.head[e]=n>=d?n-d:0}while(--a);e=a=d;do{n=t.prev[--e],t.prev[e]=n>=d?n-d:0}while(--a);r+=d}if(0===t.strm.avail_in)break;if(s=t.strm,h=t.window,l=t.strstart+t.lookahead,_=r,o=void 0,(o=s.avail_in)>_&&(o=_),a=0===o?0:(s.avail_in-=o,F.arraySet(h,s.input,s.next_in,o,l),1===s.state.wrap?s.adler=J(s.adler,h,o,l):2===s.state.wrap&&(s.adler=Q(s.adler,h,o,l)),s.next_in+=o,s.total_in+=o,o),t.lookahead+=a,t.lookahead+t.insert>=3)for(i=t.strstart-t.insert,t.ins_h=t.window[i],t.ins_h=(t.ins_h<<t.hash_shift^t.window[i+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[i+3-1])&t.hash_mask,t.prev[i&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=i,i++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<Y&&0!==t.strm.avail_in)}function ot(t,e){for(var a,n;;){if(t.lookahead<Y){if(_t(t),t.lookahead<Y&&0===e)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+3-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-Y&&(t.match_length=lt(t,a)),t.match_length>=3)if(n=G._tr_tally(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+3-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else n=G._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(n&&(it(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,4===e?(it(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(it(t,!1),0===t.strm.avail_out)?1:2}function dt(t,e){for(var a,n,r;;){if(t.lookahead<Y){if(_t(t),t.lookahead<Y&&0===e)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+3-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-Y&&(t.match_length=lt(t,a),t.match_length<=5&&(1===t.strategy||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){r=t.strstart+t.lookahead-3,n=G._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=r&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+3-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,n&&(it(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if((n=G._tr_tally(t,0,t.window[t.strstart-1]))&&it(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(n=G._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,4===e?(it(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(it(t,!1),0===t.strm.avail_out)?1:2}function ut(t,e,a,n,r){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=n,this.func=r}function ft(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=8,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new F.Buf16(1146),this.dyn_dtree=new F.Buf16(122),this.bl_tree=new F.Buf16(78),nt(this.dyn_ltree),nt(this.dyn_dtree),nt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new F.Buf16(16),this.heap=new F.Buf16(573),nt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new F.Buf16(573),nt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function ct(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=2,(e=t.state).pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:$,t.adler=2===e.wrap?0:1,e.last_flush=0,G._tr_init(e),0):et(t,W)}function gt(t){var e,a=ct(t);return 0===a&&((e=t.state).window_size=2*e.w_size,nt(e.head),e.max_lazy_match=P[e.level].max_lazy,e.good_match=P[e.level].good_length,e.nice_match=P[e.level].nice_length,e.max_chain_length=P[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=2,e.match_available=0,e.ins_h=0),a}function pt(t,e,a,n,r,i){if(!t)return W;var s=1;if(-1===e&&(e=6),n<0?(s=0,n=-n):n>15&&(s=2,n-=16),r<1||r>9||8!==a||n<8||n>15||e<0||e>9||i<0||i>4)return et(t,W);8===n&&(n=9);var h=new ft;return t.state=h,h.strm=t,h.wrap=s,h.gzhead=null,h.w_bits=n,h.w_size=1<<h.w_bits,h.w_mask=h.w_size-1,h.hash_bits=r+7,h.hash_size=1<<h.hash_bits,h.hash_mask=h.hash_size-1,h.hash_shift=~~((h.hash_bits+3-1)/3),h.window=new F.Buf8(2*h.w_size),h.head=new F.Buf16(h.hash_size),h.prev=new F.Buf16(h.w_size),h.lit_bufsize=1<<r+6,h.pending_buf_size=4*h.lit_bufsize,h.pending_buf=new F.Buf8(h.pending_buf_size),h.d_buf=1*h.lit_bufsize,h.l_buf=3*h.lit_bufsize,h.level=e,h.strategy=i,h.method=a,gt(t)}P=[new ut(0,0,0,0,(function(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(_t(t),0===t.lookahead&&0===e)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var n=t.block_start+a;if((0===t.strstart||t.strstart>=n)&&(t.lookahead=t.strstart-n,t.strstart=n,it(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-Y&&(it(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,4===e?(it(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(it(t,!1),t.strm.avail_out),1)})),new ut(4,4,8,4,ot),new ut(4,5,16,8,ot),new ut(4,6,32,32,ot),new ut(4,4,16,16,dt),new ut(8,16,32,32,dt),new ut(8,16,128,128,dt),new ut(8,32,128,256,dt),new ut(32,128,258,1024,dt),new ut(32,258,258,4096,dt)],t.deflateInit=function(t,e){return pt(t,e,8,15,8,0)},t.deflateInit2=pt,t.deflateReset=gt,t.deflateResetKeep=ct,t.deflateSetHeader=function(t,e){return t&&t.state?2!==t.state.wrap?W:(t.state.gzhead=e,0):W},t.deflate=function(t,e){var a,n,r,i;if(!t||!t.state||e>5||e<0)return t?et(t,W):W;if(n=t.state,!t.output||!t.input&&0!==t.avail_in||n.status===tt&&4!==e)return et(t,0===t.avail_out?-5:W);if(n.strm=t,a=n.last_flush,n.last_flush=e,42===n.status)if(2===n.wrap)t.adler=0,st(n,31),st(n,139),st(n,8),n.gzhead?(st(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),st(n,255&n.gzhead.time),st(n,n.gzhead.time>>8&255),st(n,n.gzhead.time>>16&255),st(n,n.gzhead.time>>24&255),st(n,9===n.level?2:n.strategy>=2||n.level<2?4:0),st(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(st(n,255&n.gzhead.extra.length),st(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(t.adler=Q(t.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(st(n,0),st(n,0),st(n,0),st(n,0),st(n,0),st(n,9===n.level?2:n.strategy>=2||n.level<2?4:0),st(n,3),n.status=$);else{var s=8+(n.w_bits-8<<4)<<8;s|=(n.strategy>=2||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(s|=32),s+=31-s%31,n.status=$,ht(n,s),0!==n.strstart&&(ht(n,t.adler>>>16),ht(n,65535&t.adler)),t.adler=1}if(69===n.status)if(n.gzhead.extra){for(r=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>r&&(t.adler=Q(t.adler,n.pending_buf,n.pending-r,r)),rt(t),r=n.pending,n.pending!==n.pending_buf_size));)st(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>r&&(t.adler=Q(t.adler,n.pending_buf,n.pending-r,r)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){r=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>r&&(t.adler=Q(t.adler,n.pending_buf,n.pending-r,r)),rt(t),r=n.pending,n.pending===n.pending_buf_size)){i=1;break}i=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,st(n,i)}while(0!==i);n.gzhead.hcrc&&n.pending>r&&(t.adler=Q(t.adler,n.pending_buf,n.pending-r,r)),0===i&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){r=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>r&&(t.adler=Q(t.adler,n.pending_buf,n.pending-r,r)),rt(t),r=n.pending,n.pending===n.pending_buf_size)){i=1;break}i=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,st(n,i)}while(0!==i);n.gzhead.hcrc&&n.pending>r&&(t.adler=Q(t.adler,n.pending_buf,n.pending-r,r)),0===i&&(n.status=Z)}else n.status=Z;if(n.status===Z&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&rt(t),n.pending+2<=n.pending_buf_size&&(st(n,255&t.adler),st(n,t.adler>>8&255),t.adler=0,n.status=$)):n.status=$),0!==n.pending){if(rt(t),0===t.avail_out)return n.last_flush=-1,0}else if(0===t.avail_in&&at(e)<=at(a)&&4!==e)return et(t,-5);if(n.status===tt&&0!==t.avail_in)return et(t,-5);if(0!==t.avail_in||0!==n.lookahead||0!==e&&n.status!==tt){var h=2===n.strategy?function(t,e){for(var a;;){if(0===t.lookahead&&(_t(t),0===t.lookahead)){if(0===e)return 1;break}if(t.match_length=0,a=G._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(it(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,4===e?(it(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(it(t,!1),0===t.strm.avail_out)?1:2}(n,e):3===n.strategy?function(t,e){for(var a,n,r,i,s=t.window;;){if(t.lookahead<=X){if(_t(t),t.lookahead<=X&&0===e)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=s[r=t.strstart-1])===s[++r]&&n===s[++r]&&n===s[++r]){i=t.strstart+X;do{}while(n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&r<i);t.match_length=X-(i-r),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=G._tr_tally(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=G._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(it(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,4===e?(it(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(it(t,!1),0===t.strm.avail_out)?1:2}(n,e):P[n.level].func(n,e);if(3!==h&&4!==h||(n.status=tt),1===h||3===h)return 0===t.avail_out&&(n.last_flush=-1),0;if(2===h&&(1===e?G._tr_align(n):5!==e&&(G._tr_stored_block(n,0,0,!1),3===e&&(nt(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),rt(t),0===t.avail_out))return n.last_flush=-1,0}return 4!==e?0:n.wrap<=0?1:(2===n.wrap?(st(n,255&t.adler),st(n,t.adler>>8&255),st(n,t.adler>>16&255),st(n,t.adler>>24&255),st(n,255&t.total_in),st(n,t.total_in>>8&255),st(n,t.total_in>>16&255),st(n,t.total_in>>24&255)):(ht(n,t.adler>>>16),ht(n,65535&t.adler)),rt(t),n.wrap>0&&(n.wrap=-n.wrap),0!==n.pending?0:1)},t.deflateEnd=function(t){var e;return t&&t.state?42!==(e=t.state.status)&&69!==e&&73!==e&&91!==e&&e!==Z&&e!==$&&e!==tt?et(t,W):(t.state=null,e===$?et(t,-3):0):W},t.deflateSetDictionary=function(t,e){var a,n,r,i,s,h,l,_,o=e.length;if(!t||!t.state)return W;if(2===(i=(a=t.state).wrap)||1===i&&42!==a.status||a.lookahead)return W;for(1===i&&(t.adler=J(t.adler,e,o,0)),a.wrap=0,o>=a.w_size&&(0===i&&(nt(a.head),a.strstart=0,a.block_start=0,a.insert=0),_=new F.Buf8(a.w_size),F.arraySet(_,e,o-a.w_size,a.w_size,0),e=_,o=a.w_size),s=t.avail_in,h=t.next_in,l=t.input,t.avail_in=o,t.next_in=0,t.input=e,_t(a);a.lookahead>=3;){n=a.strstart,r=a.lookahead-2;do{a.ins_h=(a.ins_h<<a.hash_shift^a.window[n+3-1])&a.hash_mask,a.prev[n&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=n,n++}while(--r);a.strstart=n,a.lookahead=2,_t(a)}return a.strstart+=a.lookahead,a.block_start=a.strstart,a.insert=a.lookahead,a.lookahead=0,a.match_length=a.prev_length=2,a.match_available=0,t.next_in=h,t.input=l,t.avail_in=s,a.wrap=i,0},t.deflateInfo="pako deflate (from Nodeca project)";var bt={},vt=e,wt=!0,mt=!0;try{String.fromCharCode.apply(null,[0])}catch(t){wt=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){mt=!1}for(var yt=new vt.Buf8(256),kt=0;kt<256;kt++)yt[kt]=kt>=252?6:kt>=248?5:kt>=240?4:kt>=224?3:kt>=192?2:1;function zt(t,e){if(e<65534&&(t.subarray&&mt||!t.subarray&&wt))return String.fromCharCode.apply(null,vt.shrinkBuf(t,e));for(var a="",n=0;n<e;n++)a+=String.fromCharCode(t[n]);return a}yt[254]=yt[254]=1,bt.string2buf=function(t){var e,a,n,r,i,s=t.length,h=0;for(r=0;r<s;r++)55296==(64512&(a=t.charCodeAt(r)))&&r+1<s&&56320==(64512&(n=t.charCodeAt(r+1)))&&(a=65536+(a-55296<<10)+(n-56320),r++),h+=a<128?1:a<2048?2:a<65536?3:4;for(e=new vt.Buf8(h),i=0,r=0;i<h;r++)55296==(64512&(a=t.charCodeAt(r)))&&r+1<s&&56320==(64512&(n=t.charCodeAt(r+1)))&&(a=65536+(a-55296<<10)+(n-56320),r++),a<128?e[i++]=a:a<2048?(e[i++]=192|a>>>6,e[i++]=128|63&a):a<65536?(e[i++]=224|a>>>12,e[i++]=128|a>>>6&63,e[i++]=128|63&a):(e[i++]=240|a>>>18,e[i++]=128|a>>>12&63,e[i++]=128|a>>>6&63,e[i++]=128|63&a);return e},bt.buf2binstring=function(t){return zt(t,t.length)},bt.binstring2buf=function(t){for(var e=new vt.Buf8(t.length),a=0,n=e.length;a<n;a++)e[a]=t.charCodeAt(a);return e},bt.buf2string=function(t,e){var a,n,r,i,s=e||t.length,h=new Array(2*s);for(n=0,a=0;a<s;)if((r=t[a++])<128)h[n++]=r;else if((i=yt[r])>4)h[n++]=65533,a+=i-1;else{for(r&=2===i?31:3===i?15:7;i>1&&a<s;)r=r<<6|63&t[a++],i--;i>1?h[n++]=65533:r<65536?h[n++]=r:(r-=65536,h[n++]=55296|r>>10&1023,h[n++]=56320|1023&r)}return zt(h,n)},bt.utf8border=function(t,e){var a;for((e=e||t.length)>t.length&&(e=t.length),a=e-1;a>=0&&128==(192&t[a]);)a--;return a<0||0===a?e:a+yt[t[a]]>e?a:e};var xt=t,Bt=e,At=bt,Ct=q,St=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0},Et=Object.prototype.toString;function jt(t){if(!(this instanceof jt))return new jt(t);this.options=Bt.assign({level:-1,method:8,chunkSize:16384,windowBits:15,memLevel:8,strategy:0,to:""},t||{});var e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new St,this.strm.avail_out=0;var a=xt.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(0!==a)throw new Error(Ct[a]);if(e.header&&xt.deflateSetHeader(this.strm,e.header),e.dictionary){var n;if(n="string"==typeof e.dictionary?At.string2buf(e.dictionary):"[object ArrayBuffer]"===Et.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,0!==(a=xt.deflateSetDictionary(this.strm,n)))throw new Error(Ct[a]);this._dict_set=!0}}jt.prototype.push=function(t,e){var a,n,r=this.strm,i=this.options.chunkSize;if(this.ended)return!1;n=e===~~e?e:!0===e?4:0,"string"==typeof t?r.input=At.string2buf(t):"[object ArrayBuffer]"===Et.call(t)?r.input=new Uint8Array(t):r.input=t,r.next_in=0,r.avail_in=r.input.length;do{if(0===r.avail_out&&(r.output=new Bt.Buf8(i),r.next_out=0,r.avail_out=i),1!==(a=xt.deflate(r,n))&&0!==a)return this.onEnd(a),this.ended=!0,!1;0!==r.avail_out&&(0!==r.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(At.buf2binstring(Bt.shrinkBuf(r.output,r.next_out))):this.onData(Bt.shrinkBuf(r.output,r.next_out)))}while((r.avail_in>0||0===r.avail_out)&&1!==a);return 4===n?(a=xt.deflateEnd(this.strm),this.onEnd(a),this.ended=!0,0===a):2!==n||(this.onEnd(0),r.avail_out=0,!0)},jt.prototype.onData=function(t){this.chunks.push(t)},jt.prototype.onEnd=function(t){0===t&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Bt.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var Ut=function(t,e){return(e=e||{}).gzip=!0,function(t,e){var a=new jt(e);if(a.push(t,!0),a.err)throw a.msg||Ct[a.err];return a.result}(t,e)};self.onmessage=function(t){try{var e=Ut(t.data.data).buffer;self.postMessage({id:t.data.id,result:e})}catch(e){self.postMessage({id:t.data.id,error:e.message})}}}();
//# sourceMappingURL=gzip-worker.js.map