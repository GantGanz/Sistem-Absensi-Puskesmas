const _0x3b2b=['collection','toDataURL','687444dFAwEh','URL','#pesan-login','now','width','#capture','forEach','getElementById','37086WdAVTV','onload','style','createObjectURL','reset','#pesan-signup','.jpeg','add','users','getFullYear','block','data','#capture-form','preventDefault','#submit-capture','get','ref','split','none','result','getContext','Level','83JAEhwX','2eQGOGW','img','alert-login','waktu','removeItem','4357CgcfhG','reload','addEventListener','valueOf','File\x20yang\x20sudah\x20dikirim\x20tidak\x20dapat\x20dihapus.\x20Lanjutkan?','querySelector','where','Password','firestore','51jcJvnq','drawImage','loader','src','nip','username','1fTpynK','Mohon\x20masukkan\x20foto\x20hari\x20ini\x20dengan\x20menggunakan\x20smartphone','className','269635UmgfgE','foto_presensi/','click','/\x2000:00:00','Error\x20checking\x20document','login-password','length','#alert-presensi-text','name','value','files','href','setItem','submit','bg-loader','getDownloadURL','docs','createElement','/\x2023:59:59','1367DHZmuL','message','image/jpeg','NIP','Nama','getDate','login.html','getItem','#logout','catch','alert-signup','change','Username','signup-nama','getMonth','alert-presensi','alert\x20alert-success\x20mx-auto','Timestamp','put','display','canvas','log','then','readAsDataURL','location','18610wAoEEo','index.html','1syJLIh','onSnapshot','toDate','Maaf,\x20koneksi\x20anda\x20bermasalah\x20atau\x20server\x20down','Akun\x20berhasil\x20didaftarkan','target','password','Error\x20getting\x20document:','#foto-captured','size','disabled','height','innerHTML','398131TbcOwP'];const _0x5dd9=function(_0x3bec19,_0x1ee05d){_0x3bec19=_0x3bec19-0x185;let _0x3b2b2b=_0x3b2b[_0x3bec19];return _0x3b2b2b;};const _0x56ce53=_0x5dd9;(function(_0x67c9ac,_0x153257){const _0x4782d3=_0x5dd9;while(!![]){try{const _0xe8be02=-parseInt(_0x4782d3(0x196))*-parseInt(_0x4782d3(0x1ad))+parseInt(_0x4782d3(0x1c1))*parseInt(_0x4782d3(0x1c4))+parseInt(_0x4782d3(0x1f2))*-parseInt(_0x4782d3(0x18e))+-parseInt(_0x4782d3(0x18b))+parseInt(_0x4782d3(0x1d7))+-parseInt(_0x4782d3(0x1bb))*parseInt(_0x4782d3(0x1b2))+parseInt(_0x4782d3(0x1ac))*parseInt(_0x4782d3(0x1f0));if(_0xe8be02===_0x153257)break;else _0x67c9ac['push'](_0x67c9ac['shift']());}catch(_0x2c253d){_0x67c9ac['push'](_0x67c9ac['shift']());}}}(_0x3b2b,0x8e186));const signupForm=document['querySelector']('#signup-form'),logout=document[_0x56ce53(0x1b7)](_0x56ce53(0x1df)),loginForm=document[_0x56ce53(0x1b7)]('#login-form'),captureForm=document[_0x56ce53(0x1b7)](_0x56ce53(0x1a2));let capture=document['querySelector'](_0x56ce53(0x193)),submitCapture=document['querySelector'](_0x56ce53(0x1a4)),fotoCaptured=document[_0x56ce53(0x1b7)](_0x56ce53(0x186)),fotoPresensi=null;var file=null,storageRef=null;fotoCaptured&&(capture[_0x56ce53(0x1b4)](_0x56ce53(0x1e2),_0x308f72=>{const _0x4a56b3=_0x56ce53;fotoPresensi=window[_0x4a56b3(0x18f)][_0x4a56b3(0x199)](capture[_0x4a56b3(0x1ce)][0x0]),fotoCaptured['src']=fotoPresensi,file=_0x308f72[_0x4a56b3(0x1f7)][_0x4a56b3(0x1ce)][0x0],submitCapture[_0x4a56b3(0x188)]=![];}),captureForm[_0x56ce53(0x1b4)](_0x56ce53(0x1d1),_0x5ea32e=>{const _0x381802=_0x56ce53;var _0x5bd077=confirm(_0x381802(0x1b6));if(_0x5bd077==!![]){_0x5ea32e['preventDefault'](),document[_0x381802(0x195)](_0x381802(0x1bd))[_0x381802(0x198)][_0x381802(0x1ea)]='block',waktuSekarang=firebase[_0x381802(0x1ba)][_0x381802(0x1e8)][_0x381802(0x191)]();let _0x63d888=0x1,_0x31c47d=waktuSekarang[_0x381802(0x1f4)](),_0x502dd5=_0x31c47d[_0x381802(0x1dc)](),_0x3fe5b8=_0x31c47d['getMonth']()+0x1,_0x267110=_0x31c47d[_0x381802(0x19f)](),_0x1c8d5f=_0x267110+'/'+_0x3fe5b8+'/'+_0x502dd5,_0x1809b4=new Date(_0x267110+'/'+_0x3fe5b8+'/'+_0x502dd5+_0x381802(0x1c7)),_0x2a01f3=new Date(_0x267110+'/'+_0x3fe5b8+'/'+_0x502dd5+_0x381802(0x1d6)),_0xa5512f=new Date(parseInt(file[_0x381802(0x1cc)]['slice'](0x0,0xd))),_0x4248eb=_0xa5512f[_0x381802(0x19f)]()+'/'+(_0xa5512f[_0x381802(0x1e5)]()+0x1)+'/'+_0xa5512f[_0x381802(0x1dc)](),_0x529fba=localStorage[_0x381802(0x1de)](_0x381802(0x1e3))+'/'+_0x4248eb;storageRef=storage[_0x381802(0x1a6)](_0x381802(0x1c5)+_0x529fba+_0x381802(0x19c)),db[_0x381802(0x18c)]('presensi')[_0x381802(0x1b8)](_0x381802(0x1c0),'==',localStorage[_0x381802(0x1de)](_0x381802(0x1e3)))[_0x381802(0x1a5)]()[_0x381802(0x1ed)](async _0x58d4ca=>{const _0x2ba985=_0x381802;_0x58d4ca[_0x2ba985(0x194)](_0x1a6a29=>{const _0x3a6067=_0x2ba985;if(_0x1a6a29[_0x3a6067(0x1a1)]()[_0x3a6067(0x1b0)]['toDate']()[_0x3a6067(0x1b5)]()>=_0x1809b4[_0x3a6067(0x1b5)]()&&_0x1a6a29[_0x3a6067(0x1a1)]()['waktu'][_0x3a6067(0x1f4)]()[_0x3a6067(0x1b5)]()<=_0x2a01f3[_0x3a6067(0x1b5)]()){_0x63d888==0x1&&(document[_0x3a6067(0x195)]('loader')[_0x3a6067(0x198)][_0x3a6067(0x1ea)]='none',document[_0x3a6067(0x195)](_0x3a6067(0x1e6))['style'][_0x3a6067(0x1ea)]=_0x3a6067(0x1a0),submitCapture[_0x3a6067(0x188)]=!![],setTimeout(()=>{const _0xff828d=_0x3a6067;document[_0xff828d(0x195)]('alert-presensi')['style'][_0xff828d(0x1ea)]=_0xff828d(0x1a8);},0xbb8),_0x63d888++);;}});if(_0x63d888==0x1){if(_0x1c8d5f==_0x4248eb){const _0x37e547=new FileReader();_0x37e547[_0x2ba985(0x1ee)](file),_0x37e547[_0x2ba985(0x197)]=async function(_0x49a6bd){const _0x4e5244=_0x2ba985,_0x60a9ce=document['createElement'](_0x4e5244(0x1ae));_0x60a9ce[_0x4e5244(0x1be)]=_0x49a6bd[_0x4e5244(0x1f7)][_0x4e5244(0x1a9)],_0x60a9ce[_0x4e5244(0x197)]=async function(_0x3138e4){const _0x4e5550=_0x4e5244,_0x2588e0=document[_0x4e5550(0x1d5)](_0x4e5550(0x1eb)),_0x2c5f84=0x190,_0x4a795e=_0x2c5f84/_0x3138e4[_0x4e5550(0x1f7)]['width'];_0x2588e0['width']=_0x2c5f84,_0x2588e0[_0x4e5550(0x189)]=_0x3138e4[_0x4e5550(0x1f7)][_0x4e5550(0x189)]*_0x4a795e;const _0x3c3eb3=_0x2588e0[_0x4e5550(0x1aa)]('2d');_0x3c3eb3[_0x4e5550(0x1bc)](_0x3138e4[_0x4e5550(0x1f7)],0x0,0x0,_0x2588e0[_0x4e5550(0x192)],_0x2588e0[_0x4e5550(0x189)]);const _0x584c0c=_0x3c3eb3[_0x4e5550(0x1eb)][_0x4e5550(0x18d)]();var _0x278e8c=atob(_0x584c0c[_0x4e5550(0x1a7)](',')[0x1]),_0x4cb6e4=new ArrayBuffer(_0x278e8c[_0x4e5550(0x1ca)]),_0x5bd58e=new Uint8Array(_0x4cb6e4);for(var _0x1d9565=0x0;_0x1d9565<_0x278e8c[_0x4e5550(0x1ca)];_0x1d9565++){_0x5bd58e[_0x1d9565]=_0x278e8c['charCodeAt'](_0x1d9565);}var _0x257e28=new Blob([_0x5bd58e],{'type':_0x4e5550(0x1d9)}),_0x32a8b1=new File([_0x257e28],file[_0x4e5550(0x1cc)]),_0x21c7d0={'cotentType':_0x4e5550(0x1d9)};await storageRef[_0x4e5550(0x1e9)](_0x32a8b1,_0x21c7d0);var _0x3c7313=await storageRef[_0x4e5550(0x1d3)]();db['collection']('presensi')[_0x4e5550(0x19d)]({'username':localStorage[_0x4e5550(0x1de)]('Username'),'foto':_0x3c7313,'nama':localStorage[_0x4e5550(0x1de)](_0x4e5550(0x1db)),'nip':localStorage[_0x4e5550(0x1de)](_0x4e5550(0x1da)),'waktu':waktuSekarang})[_0x4e5550(0x1ed)](()=>location[_0x4e5550(0x1b3)]());};};}else document[_0x2ba985(0x195)](_0x2ba985(0x1bd))[_0x2ba985(0x198)][_0x2ba985(0x1ea)]='none',document[_0x2ba985(0x1b7)](_0x2ba985(0x1cb))[_0x2ba985(0x18a)]=_0x2ba985(0x1c2),document[_0x2ba985(0x195)](_0x2ba985(0x1e6))[_0x2ba985(0x198)]['display']=_0x2ba985(0x1a0),setTimeout(()=>{const _0x5c568d=_0x2ba985;document[_0x5c568d(0x195)](_0x5c568d(0x1e6))[_0x5c568d(0x198)][_0x5c568d(0x1ea)]=_0x5c568d(0x1a8);},0xbb8);};})[_0x381802(0x1e0)](_0xe9a63b=>{const _0x1163b5=_0x381802;console[_0x1163b5(0x1ec)](_0x1163b5(0x1c8),_0xe9a63b);});}}));localStorage['getItem'](_0x56ce53(0x1ab))=='Admin'&&(signupForm&&signupForm[_0x56ce53(0x1b4)](_0x56ce53(0x1d1),_0x550048=>{const _0x2df6ae=_0x56ce53;_0x550048[_0x2df6ae(0x1a3)](),document[_0x2df6ae(0x195)](_0x2df6ae(0x1e1))[_0x2df6ae(0x198)][_0x2df6ae(0x1ea)]=_0x2df6ae(0x1a8);const _0x2731ec=signupForm[_0x2df6ae(0x1e4)][_0x2df6ae(0x1cd)],_0x485b75=signupForm['signup-nip']['value'],_0x30e42b=signupForm['signup-username'][_0x2df6ae(0x1cd)],_0x58b913=signupForm['signup-password'][_0x2df6ae(0x1cd)],_0x4d731c=signupForm['signup-level'][_0x2df6ae(0x1cd)];db['collection']('users')[_0x2df6ae(0x1b8)](_0x2df6ae(0x1c0),'==',_0x30e42b)[_0x2df6ae(0x1a5)]()[_0x2df6ae(0x1ed)](_0x1b6182=>{const _0x195064=_0x2df6ae;_0x1b6182[_0x195064(0x187)]>0x0?(document[_0x195064(0x195)]('alert-signup')['style'][_0x195064(0x1ea)]=_0x195064(0x1a0),document[_0x195064(0x1b7)](_0x195064(0x19b))[_0x195064(0x18a)]='Maaf,\x20Username\x20sudah\x20terdaftar',document['getElementById'](_0x195064(0x1e1))[_0x195064(0x1c3)]='alert\x20alert-danger\x20mx-auto',setTimeout(()=>{const _0x552c88=_0x195064;document[_0x552c88(0x195)]('alert-signup')[_0x552c88(0x198)][_0x552c88(0x1ea)]='none';},0xbb8)):(document[_0x195064(0x195)](_0x195064(0x1e1))[_0x195064(0x198)]['display']=_0x195064(0x1a8),db[_0x195064(0x18c)](_0x195064(0x19e))[_0x195064(0x19d)]({'username':_0x30e42b,'nama':_0x2731ec,'nip':_0x485b75,'password':_0x58b913,'level':_0x4d731c})[_0x195064(0x1ed)](()=>{const _0x299b36=_0x195064;document[_0x299b36(0x1b7)](_0x299b36(0x19b))['innerHTML']=_0x299b36(0x1f6),document[_0x299b36(0x195)](_0x299b36(0x1e1))['className']=_0x299b36(0x1e7),document[_0x299b36(0x195)]('alert-signup')[_0x299b36(0x198)][_0x299b36(0x1ea)]=_0x299b36(0x1a0),setTimeout(()=>{const _0x15424b=_0x299b36;document[_0x15424b(0x195)](_0x15424b(0x1e1))[_0x15424b(0x198)]['display']='none';},0xbb8),signupForm[_0x299b36(0x19a)]();})[_0x195064(0x1e0)](_0x5620f8=>console[_0x195064(0x1ec)](_0x5620f8[_0x195064(0x1d8)])));})['catch'](_0x2ba508=>{const _0x1fb36f=_0x2df6ae;console[_0x1fb36f(0x1ec)]('Error\x20checking\x20document',_0x2ba508),document[_0x1fb36f(0x1b7)](_0x1fb36f(0x19b))[_0x1fb36f(0x18a)]=_0x1fb36f(0x1f5);});}));logout&&logout[_0x56ce53(0x1b4)](_0x56ce53(0x1c6),_0x455d59=>{const _0x285d77=_0x56ce53;localStorage['removeItem'](_0x285d77(0x1e3)),localStorage[_0x285d77(0x1b1)](_0x285d77(0x1db)),localStorage[_0x285d77(0x1b1)](_0x285d77(0x1da)),localStorage['removeItem'](_0x285d77(0x1b9)),localStorage[_0x285d77(0x1b1)](_0x285d77(0x1ab)),window['location'][_0x285d77(0x1cf)]='login.html';});loginForm?(db['collection'](_0x56ce53(0x19e))[_0x56ce53(0x1b8)](_0x56ce53(0x1c0),'==',localStorage[_0x56ce53(0x1de)](_0x56ce53(0x1e3)))[_0x56ce53(0x1b8)](_0x56ce53(0x1f8),'==',localStorage[_0x56ce53(0x1de)](_0x56ce53(0x1b9)))[_0x56ce53(0x1f3)](_0x328495=>{const _0xb861cf=_0x56ce53;_0x328495[_0xb861cf(0x187)]>0x0&&(window[_0xb861cf(0x1ef)][_0xb861cf(0x1cf)]=_0xb861cf(0x1f1));}),loginForm[_0x56ce53(0x1b4)](_0x56ce53(0x1d1),_0x28153b=>{const _0x1d2b1e=_0x56ce53;document[_0x1d2b1e(0x195)]('loader')[_0x1d2b1e(0x198)][_0x1d2b1e(0x1ea)]='block',document[_0x1d2b1e(0x195)](_0x1d2b1e(0x1d2))[_0x1d2b1e(0x198)][_0x1d2b1e(0x1ea)]=_0x1d2b1e(0x1a0),_0x28153b[_0x1d2b1e(0x1a3)]();const _0x44abcc=loginForm['login-username'][_0x1d2b1e(0x1cd)],_0x3d013c=loginForm[_0x1d2b1e(0x1c9)]['value'];db['collection'](_0x1d2b1e(0x19e))['where'](_0x1d2b1e(0x1c0),'==',_0x44abcc)[_0x1d2b1e(0x1b8)](_0x1d2b1e(0x1f8),'==',_0x3d013c)['get']()[_0x1d2b1e(0x1ed)](_0x24b996=>{const _0x18b8ca=_0x1d2b1e;_0x24b996['size']>0x0?(localStorage[_0x18b8ca(0x1d0)](_0x18b8ca(0x1e3),_0x24b996['docs'][0x0]['data']()['username']),localStorage['setItem'](_0x18b8ca(0x1db),_0x24b996[_0x18b8ca(0x1d4)][0x0][_0x18b8ca(0x1a1)]()['nama']),localStorage[_0x18b8ca(0x1d0)](_0x18b8ca(0x1da),_0x24b996['docs'][0x0]['data']()[_0x18b8ca(0x1bf)]),localStorage['setItem'](_0x18b8ca(0x1b9),_0x24b996[_0x18b8ca(0x1d4)][0x0][_0x18b8ca(0x1a1)]()[_0x18b8ca(0x1f8)]),localStorage[_0x18b8ca(0x1d0)]('Level',_0x24b996[_0x18b8ca(0x1d4)][0x0]['data']()['level']),window[_0x18b8ca(0x1ef)][_0x18b8ca(0x1cf)]=_0x18b8ca(0x1f1)):(document[_0x18b8ca(0x195)](_0x18b8ca(0x1bd))['style'][_0x18b8ca(0x1ea)]=_0x18b8ca(0x1a8),document['getElementById'](_0x18b8ca(0x1d2))[_0x18b8ca(0x198)]['display']=_0x18b8ca(0x1a8),document[_0x18b8ca(0x195)]('alert-login')[_0x18b8ca(0x198)][_0x18b8ca(0x1ea)]=_0x18b8ca(0x1a0));})[_0x1d2b1e(0x1e0)](function(_0xbe9d00){const _0x29efd2=_0x1d2b1e;console[_0x29efd2(0x1ec)](_0x29efd2(0x185),_0xbe9d00),document[_0x29efd2(0x1b7)](_0x29efd2(0x190))[_0x29efd2(0x18a)]=_0x29efd2(0x1f5),document[_0x29efd2(0x195)](_0x29efd2(0x1bd))[_0x29efd2(0x198)][_0x29efd2(0x1ea)]=_0x29efd2(0x1a8),document[_0x29efd2(0x195)](_0x29efd2(0x1d2))['style'][_0x29efd2(0x1ea)]=_0x29efd2(0x1a8),document[_0x29efd2(0x195)](_0x29efd2(0x1af))[_0x29efd2(0x198)][_0x29efd2(0x1ea)]='block';});})):!localStorage[_0x56ce53(0x1de)](_0x56ce53(0x1e3))?(localStorage[_0x56ce53(0x1b1)](_0x56ce53(0x1e3)),localStorage[_0x56ce53(0x1b1)](_0x56ce53(0x1db)),localStorage[_0x56ce53(0x1b1)](_0x56ce53(0x1da)),localStorage['removeItem'](_0x56ce53(0x1b9)),localStorage['removeItem'](_0x56ce53(0x1ab)),window[_0x56ce53(0x1ef)][_0x56ce53(0x1cf)]=_0x56ce53(0x1dd)):db[_0x56ce53(0x18c)](_0x56ce53(0x19e))[_0x56ce53(0x1b8)](_0x56ce53(0x1c0),'==',localStorage[_0x56ce53(0x1de)](_0x56ce53(0x1e3)))[_0x56ce53(0x1b8)](_0x56ce53(0x1f8),'==',localStorage['getItem'](_0x56ce53(0x1b9)))[_0x56ce53(0x1f3)](_0x4f0b48=>{const _0x48a20a=_0x56ce53;_0x4f0b48['size']<0x1&&(localStorage[_0x48a20a(0x1b1)]('Username'),localStorage[_0x48a20a(0x1b1)]('Nama'),localStorage[_0x48a20a(0x1b1)](_0x48a20a(0x1da)),localStorage[_0x48a20a(0x1b1)](_0x48a20a(0x1b9)),localStorage[_0x48a20a(0x1b1)](_0x48a20a(0x1ab)),window['location']['href']='login.html');});