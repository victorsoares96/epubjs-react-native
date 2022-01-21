import * as React from 'react';

import { SafeAreaView, Text, useWindowDimensions, View } from 'react-native';
import { Reader, BookProvider, useBook } from 'epubjs-react-native';

export default function App() {
  return (
    <SafeAreaView>
      <BookProvider
        defaultTheme={{
          'body': {
            'background': '#333',
            'font-size': '12pt',
          },
          'span': {
            'color': '#fff !important',
            'font-size': '12pt',
          },
          'p': {
            'color': '#fff !important',
            'font-size': '12pt',
          },
          'li': {
            'color': '#fff !important',
            'font-size': '12pt',
          },
          'h1': {
            color: '#fff !important',
          },
          'a': {
            'color': '#fff !important',
            'pointer-events': 'auto',
            'cursor': 'pointer',
          },
          '::selection': {
            background: 'lightskyblue',
          },
        }}
      >
        <Book />
      </BookProvider>
    </SafeAreaView>
  );
}

function Book() {
  const { width, height } = useWindowDimensions();
  const {
    getCurrentLocation,
    getLocations,
    progress,
    totalLocations,
    currentLocation,
    atStart,
    atEnd,
    updateTheme,
    changeFontSize,
    changeFontFamily,
  } = useBook();
  return (
    <View>
      <Reader
        src={{
          base64: `UEsDBAoAAAAAAAWULFRvYassFAAAABQAAAAIAAAAbWltZXR5cGVhcHBsaWNhdGlvbi9lcHViK3ppcFBLAwQUAAgACAAFlCxUAAAAAAAAAAAAAAAAFgAAAE1FVEEtSU5GL2NvbnRhaW5lci54bWxdjsEKwjAQRH8l7FXa6E1C04KgVwX1A2K6rcF0NzSp6N8bPVTxNod5b6ZqHoMXdxyjY9KwKpcgkCy3jnoN59OuWINo6soyJeMIx79upilqmEZSbKKLisyAUSWrOCC1bKcBKalPTc0SqKuROXXOY/xG0U3eF8Gkq4b9dnM4yjeQ8ZJDB2LA1pkiPQNqMCF4Z03KRyTjJcSM2ZvpcZGXQNaV/PHLebd+AVBLBwgC5S2upwAAAO8AAABQSwMEFAAIAAgABZQsVAAAAAAAAAAAAAAAACAAAABPRUJQUy8wX3RoYW5rcy1mb3ItcmVhZGluZy54aHRtbO19bY/bOLbm9/kVTC2w2AVclVTeX7o76JnMnS5g7u3Bdu825iMt0RZjSlRIqhz3r9/zHJKS7EpSrirs9FojoGeS2LItkYfn9TnP+e7959qIa+W8ts33Z5cXT86Eagpb6mb9/dn//vU/zl+fvf/hT989+vDzX3795z/+KqpQG/o3/hD00cZ/f1aF0L59/Hi73V5sn11Yt358+ebNm8efcc1ZvOitarvl3pW6bFd87dMnT149tq0/E0biN1Vz9sOf/iTEd5WS5Q/4S9DBqB9+rWSz8WJlnXD0Dt3fo+8ex7dwkdHNht4w35/5sDPKV0qFMxF2rfr+LKjP4XHh6Scqp1bpigt+4TF/+HH8re+WttzRH76VjdDl92elLfy5boJyjTTn606X5y+XT14Xz54uz1+tVqvzy1VZnL948+byvHz5oiifPn/2/Jl6evbDd60otfv+zAR3Jvjn6O+6UeeV0usqvH3++uJJ+/kdboy+v1RNeCuevWzDu1q6tW7Og23fPhn+ubQh2PrtJV6iL+f7S98qRGGNdW+FWy//x+Xzhbh8uRBPX/7Pd2Ipi83a2a4pz9MlwcmGPuvo597RQjbh/Fo6LenPpquV08Vb0VhXS3PwrpI+nEtPfx8uIJEJuqBVkUav6fWl9ApP+E5sKx3UOf1Ood6K1qnzrZMt3favlRJ153VBty5d8KI1ckfbuBCyKUWgd4vOBakbYVvV+AXt5rWib2/W/Oba4TL66FrxBzR9w9JhNYXB//sL8X90EUg8RNhqZ7yIbwYbv1thG4Vd0QeF9PzaUskgcHdeSF4okgSs7Q+Vcie6yBf5EX462UcQtb1WNf027a8qbK2EbZTY6lDxprEISUM/EBSpA2NlgIiQ2OBdqV2/BL9U6lSXQHthrA94qpMXSVHKplALsdbX2KjTf55CtkFfk6x1pSZbSX8RrXIrfCH+1TVGb6CjdsKSSLqL9MTfPW5Pxi7wl7wlVUmrUvwBa/w3KPtaLvjol3InrkgBGEMKAbp77aC46S8724mtcmqRl/g0JSrZrVBpeDjJOEVTqZrSD/aRnBrnxVb6SpCOdBMwVyd4Nv4AyVjabZQC9RluD2SBHaGFqOUGStVZW7NrjLcaWqE9jZRsI9nSVpHHTJ7+FNwEtSP7v9UkCHSN6g2lP12rT1GIi7vbakX7dvpP9LHzvSiqktT3GrJo2fUXck3O/oX4rSJvHUIcffDFBB6b3De5tB0HH9JvhF5hV53iN0St6fBu+mPZOkuxTR2FWDbsM0SfyUX7d/Lr8d//2+enTy7fvPOkmmC2vKInXSoSCriFho6wp8VIgRorttkuHGUXtjKQT0BRkCP1j8VbOTpIqvchohTlA0gvmxpRBS+zpMCKnoiCp8komlKXUwj+CtnkExPomBhNh4Zc8UfiJ7vFm9i/naAXSV0YQ6+R4+g5zwGtQqq1UO/FX2VRfckJYJEYuwLQSV2jP3VqSMTQgzsNMSKV5ekXG9LdvMLRxZBhIbwVVX879BVJ1JaI1rNzkn4euj0K7KAI4m0k+Xs/n/Yj9Odf3l2JUtXYI8Q9pfafOvqK1Y53pLcYuiZLq2VQZvcofvDDu5wZ83LnaetoRVpsCscQJDcwMpZNFO1ySfpjVr+3pzJ5paB5t030zZ1aS0fRWtbNSFhJ0Xa//24UPHf6vPfse6cr6NSMVt7Qu/AFlob2mO4nbWj8bp1N56ah3+NjmDz/QMtCHxH0SoGwGK+V5E7IeQ+PO1S/4fDoaC8bGTqXdoRecoq0og/v+2M02nfdkO7dwbubT8txzsra0A2QOIfBzYPPS+s9clVo1SnY5WiAxL4kd2Yzzu6mjNtgR1ontSeFJfJ2/jroQtF5Onj1rk8Zx6iKv1iXgxe0Z4t6ByIu9qc1LYbpaL1/Uo/JpzgTn849xII+8v3Z5RkuGP79/Hm/6bdswhk7KI/Ozz+tL8+fPz8//+G0U1jCV7YziPAGw6RV2Vug+YgcaVB8RU6cF1A/KEouesG2OYlDvpl0u8UoT8ByvpWILUu9Wik8RC/0tf48OHbZ4a8kWSSTqizsPpBLQbYG54IiUDpvhelKhR/pfDY1OobyqghQfEWh2iDJ9FzMe3wXNYji56AGedMXoqZ9qWhXmjX7ZS259qTy6CQl938KYU1FAtpYsbXkJC1YyhpdcHHPczhx+kEoSSuH43Ird/8yp+CEM7jrWOWhKJYWzJMx1uVb5MoQ3lSSgl4SF5YRlhlEKhTALKCH4CYoz/m1yhoOiOhkaQMzPLtjR+mhmu2Mh7+LhYVWSoiJpJqSEzXOrR/6RJV67G/1iV4c7xP5kU/04vR9olZ68k3FcjcF9e1brkWyF4Gjl8LWcSZJXlsNYBZyU25Hin0+it9e1N9wtrCKQdd8DGXT0N0VMSSiMKjhBIBz+hpGMp5c8uaMpUXuETFpCxD4x5TBgpxBs0F2YS+nPgEhXCll4Oaarm6nAY4JlbPIp8opoM84tYjEM9nnVWcMlMSyC4GiBnJjKUr/L05iTWLjKHxCBn7HNdsYe6UMLBzdZGTVZ4qYOGVRkotbK0A81oLxQcgwXYhfHfLuk6h42obCQq8/B9UvC7lmCwjAFGrzEi4nSi5k1l1v/mLuiPxTckK9biZRtI+ZhBXZnHNs4znt4gWnPmtVW7eLj05O4ko7vw80SY78ElVIchUinMFO4bAz1oSstRrBrk54i4215B/gtlCu02F21I4rFvxIQRKiU3QgUCRakoQP1YG/5XDWb5ILFlPXGYFeaVPS/Y+KoFwRSvCteQuO24K0yjdrm5XtAq17KX3Vr/vpa56YI2FQ0CA4W6lDREzVo9LHPxEjrDNy9mofR4CPzNn4O6GPha+1UbnLBDlv8tE3mmN6DtpsC1t4CG3YT9sbFchuAvJEn7FepeaUOWl+NwCsknXCQcfeHlTAJ3W4302hMcL60EHY4x7RWyFonJupNFfNh/UoE/1nJbugV51Z3PCNgEDK0BhWr+PKPQWR/0XB4l8cPRewZNJAe+bGj9ixRxHHToVZfR63I3/XIRiKUq3qUxJAECFfcfpBTDIF+1nOGJoyfGcsODFWhQEx8iBonUDAjgf1FSo4fLQmZRhnpXskODQMLqgUQashQuqBBn19gQIFTtIM0NyYDEgnCVBFepp56Y+HEL4/jEfpQ75VMQE2Kqdyc9YUItNZOI7MVwBfPdTu1uTRdG1sB1rsndAkIGMPKfEbREdpXu+jIkUQgZB6K2yzAi4OcHeYx67xCdq7TYDfSratakgDzit7nCSnFYYTdUXGQ4ofm9KprY9YHbI4JYflqSyANpToh6GIsEBFQdEVMYMem7+EXYLvg17VqYtkhCYYrNmLJ7Gc9GgPh51NWToxScs6K12uzWS08Ly/RwITVcuJla10JXfxVHKzE0at/YX4DQpJobSLy6YQPAD+NIXK69aSmIIVoLLxDMWz2ePpZ+k/Trv903Y3awqdax36C0buGn3f6lRlZbmDsoTTP5GOea9Ulnw1i/xDQkZvkyZB2k6UdlQ6QsGTuUne7/mrX8GELu3u8Vo7821U6LPXx6NC8W0ZFvrs9QALFSe6/IuoohdcKO5dffoMYycPsqJXYt2hM5B7fgv02Ix2plSFLtFFpckwk9fTxQ4O+jYF0JX4aJdzze9OTlAjnQPZykQgK/DVIxYUPQkLcubkdSbUyxmh7M370DVh4BqiZSjFWnp0Cl+Iv0vIE+dWG8jIYiIpZF6bSQAF4i/3xCP70Oycf8hNOOozxWeNZNQ26Q108p/+Zi4VAtFyMr1S40h5pUzIuFHUN+yWe81BMhfdngvxowmV7dbVDVwik870wnDNLVeLURN6Qu196nTMAKMzBEwiPfdYEhqnycSDF4LbtbbVLtaVTl9wgCqPixs1IUgtOD1OD7htYjdDRO5OA8dKYrFhQDL9y3HSZmbg+Pay/VJZxwigVZgC7R7FTdfgw6X/VWKpXahKeAc9qxCMIuPnUh6BU2mxxQccvAZgnJia5qv41MxB13FB18/VQqzoa+lLdbHg4AqF20iEYO1+kvNBMdbzN/eLsZ6/mQAdATPdfLQ7cEi0zHbDJFmsy7mfdJbXI/NiSla9mI5izzXAXcAuU8BJLmSdPBP6cW12i8NM2kfL6daVSejcaGi5wmUM7jrHvdmLmQoNIKnXkEmAZibguy/ilX9I8/GLy3s1H7+4/H+iAf/otUSzIR03cv2uhKx7o84c/DEUeMhSP73fUj+d5lJ76Qo28e8nxk09hTwBacwppPh6r5yd9NmhuROMgbTd2nIuNGU8dKS3BExkcMJTanSEMMi0fLkHZ0RNxntRSWOG9P0HuhpXLZVHpv70ZS6ze+6tXwLZViRbPIuFHcKdKOgulZsrEMct7X8q2dB7Ri1uyFTiU/0yc0vFDLCZunMCIsYg/5h3wCgYChu40z62T00jA+eRqGZ1g6bFIGPpb4RKz0MfJvHIQ5WZO+iRfmSas2Y2WccS/xpJYfYoEZ3YAJmA710sDkcUnhUt0vi1WnyJ/Hcapa6oG/oKhZ8E54IOM27lllX6a6KVoq9IlanYofsuGUPkn0ZlLZhGS4szL+u3l/VHwW4H6ZgA+homo9Z+n+IkAQxZx7ASpy9VRUhGLI2xKLsiM8q31geUYvstqzrHlPLwWJRKX5YMAjSWmhOyd4pfFgfpWCRoe3+cVnjAan2g35WLKTSFWVsmrb+YibfvgGnK2jKxwgFWwKgzQLsTlU9fAd+qQB+wpQFd1xQI48BBROehLzqMhtGA/DuFWr61rPCMkmUPJG1Ih0mubpz+4cHDXog/dyH2v0wE+qv9iFZtGqFhhP0UtkHCyM1m8S5NmI8OuzBH+OYE5Y88QSmHgp6k7aGf87Gr28jHyP3HHqSGbQq4tMPTFpuoT8GiJYbDdLraYYHi+O/kidlBG85yd2Rs7mPbjeQa9402YPW5oNi99gtm+txOYwIueKdE184icltgBfWS9YpvEOa4fdWCaQ9JsYA3isTkoFE1Vye+QDTllCwiuHfEhjSFLKHvCrRE0KfrGOVvlWLODj+nDO+glnTIK0lxvdOYEhUdpZAC+VqlIcqOpA5NhKErd+8Pal/cpMI7YHbz4h+LmaKDXNU1xlw8Ele00ImK7+nLdzebDAMzJANV3ZW0TmbH4VjcqGbdqXNurcZBYPBa7my/EFdgo+W+jklgpUrFxUNVvkNUliahTgUHtnLI4GMTSY+1Rn3GBv4Uu3GArVfS0Lt0zhxr89QhtofI/ZeOFTnRtf6Hg00E80DnGi/SDF6MjW9iFXGp12vEVyjTqybyRTViH+XSWu+hLufFPk7d/YIAKSSc7aMbCg6tJ+QDN1yqiUYFGd+vo83IXVZm9Tg1W38bdvbqDrCz3L2doGevnp4+zrlrR8N/KR69D11WEkmjVv9O/lF2N2vhrcM8NfDUI4sOzEEJKL5YSR6W7PquKqbIiA78FUX/9G69i0wniwOvyakWEw84zwolhFQBVP3N/WKcv1M8+12a1A+cRybCS/v6KcEJueV0PLvT6ehPxrPTPxmjuRMRS0EGQZVfX01/xGo+v99qTmC8YywVWPFRGQoDxH/Ab7W1QmWPywYPEtIX91vW058QBZqquu9NkaRwavDlZqWRu68iHd8ww5vbOhOLAI9yDDxWbxPjA+7po1foqxMB00q6uGUP2qWX99ullxPYJV7F2mJcJk/HqK1LjqMEib+s02K7LtVY9OohUPpXr+4FpX/16vT1TMA0v1zhfsgSvr7fEr4+/SVEyVOVfejIY3kBuXjQ4X9zv8M/gU5C7n2PebPxscfAxHMfnCXjxypARWa87QFFC1fzQDb2oPV//eRe6//6yQQ6OeknbOfn5OOxkc3f1YjWKeTOhhx00JP3ihVNv/5UjfJN7lQGbLgugV31XDm/ZQl/jvSnkdDnSzi+fvAkFFuyJ2VEpx+QrkcAYXRItzLwFOQhzgWVhprRWsehtXQcLgN2Wo1GiNNPfzOdyiTGj2o/mdmViGUWYAIa5sjWnQcjBQ47j1Cg/4sxz6L3gIqYRndiTRGns2AGO/1djXMkQGrkeIKW0SX+BA4o6T5uQ4oLtTKdLnXYYQpvjQwg+YdDtHfqxECY2zjr6Vu4gFKVNp6eSYBDy9Sl6isLi57Gd3IxtvGilbrBNN9dJgekR2xky7qw1uU5nx86Pip2seWqj0tUH8lRGGW7MzE30wv6C/EhIWRwzPKwqJwD2CjF7C29lqK3Az1NvBe3i/XTEGfYq4zTEysu72VutFmij/E81ipMpEFsBbzQ0B8EHT1wWpJzSsI2BcNFf9VNUGsnQzZPfELUjead+QTcheUi5dg9N7lzu8QkegxTe/EUWsQ/xA7QFLKuKOw0Kot8nD9RSbPK5Jk4JK7W3lNQSwf/5ym48Fzq4VlmsJqLSbVB0KnL9fI8jgJ9zVF8ma1oAibKwmnZag/K3jV5WIueenmsv7MztgZvK/Bfe+6V8nveVf4KpBB0rRC2iVoyEzhIImqwxeKNSTA3527SOFBpMY08SV83eDQb7COZEXj4YWmBxAFxyMHsgi1je75E5yMfxHb25uW96otvTr8aLlzHiucgA5xtcRyvKV2vwUakJrMXepxQ8yRcDDBFCg6QtC39BiDgJOnSWBhAb/mNNOcBgbYSiffdfYH6A3ASPwWzCeZWn1EzeOA8S7iSrhUKEw2iWNa0NoXs/OAWktzSzfcsxqX2sm0t+YYM65gGi/kc6N3WkjUNsphYYTtQrwxCYp9IisJYr6bgFMmy1sH3WDfyhFXT0UfMjvxZH9AhfSMtGBG8jEskzUA3YoH8zHMSPijVMrH/RFpLWrqfMsKX6WnpVjY8CqihX1Cpz3kKeh8Naqi05CIzuGPI7JVTaKctMMbpNOct/9FEux90+RA//vLJ83s58vS5afIWUyQ1pJICh1WoCvn34sEr/eKeK/1imiuNCUwpbNI+9uRiIPHg5U+JOZoLf5OwuNyyPwWTCr6BOVw4bjRy6+REKMObjVF0YUn+83iaX9vFaR4TIKjuOPVEsVCq+PSpqXFeHQPFZ+G/ZfRGk4bNcS0h+t2JexoYMDSsk8GSLiJCdUMLXMCc+sUek3GsSnDztdyfSSjzxDr6Xt2ADLmZc4RHaaQxCUxhuRa4xiw+DHg2dgtwEv6MIzu5XaGR2kwDvGhb3ZD4TAHAgbxuX8TC3U0JfgNqPuRaY56qtBFjBED5BB4Rj7R2IK9lzpLY9Ze8hZUGLXXMxk+BHe5mdwXycMzOwkHMnHQ+sq6Dis24yBsp4ZiACbwU+yMXc0IzFTi2Sm6i9/YO/Txc9UxjN1TDHKXM4xRHbnypOSYoWWDHuPi5BYhzKA5twebGPcNGesxbkOBICaCl8bQ+UzivcOB5knXP0USbkSnzkfQIdGtrgFvhBqvPyhXaJ+qAOAs2DmPgLfC9sqZosFUX84STu0RTbSxG5o0ANAXpjijT0eOUIybFeVGPUi6RbHCr1IYbEvJcUdMVGzQriNpi2CtCoS0JvGoTWhsTi5IOSsFhZU0JfbCvRLL64Mnhetb5d+XeXlljoGe5ZofM3wR0ahIJeAMtE22RG1slArOTf7zo0k2gWGzT4AUoVvbIJ/BMsBRrJ8tOhjh2TPiistbE5rW2BYdiyvoUdN8MFsxuF1qg81jrQpaq3l2Iq9VkcnvajxxMu5E7JAVYg+u6B8PkyWJ+MRVpMKNJWSe8h0UVs2kcCECmjXS+0m2s72PrbNtaF7pGhx2uMkq6Zui1Zmqg8bytfpTaEL4xF3XnxapzUNcToaQur/s85BD0JKYktHFQKJWh0+MQDEni2Ze52+SZLyBsRYptEUqhnvmud0CXluQTmDwLLuIEGHXcX0uyySAddj5JnTdlHbMKpS5v5XcAhJfd3Ti3aC+k5U62DPhTZYyhT1/GDYJO0uCts2uKzCfRw7Z3GLlIULLq03ULvmq0lgo7BW9ZNx87xzzOZKVneP+3V2uUTW0j3DzTcHI+hm60GCVhJlDTYI4us5ot0Z3ZW9dGlr2x2SpjDrs9kKYPX0l55iCh94fnDTgOEMF91UMOTzMv4liTS58oda9ETUEWctbpCM/Z0ju3OHEtLUXyZZTkK+B3XMnJuwjn2HFCu4wjFZO1+VLn08XXUHw/qce/3Irie3oHJsBfRii+pxOgAgSP/zJRygfSNP1AbutUFPbD6nwcMecxysTMo7yOlfg/Oy52gXT4y617PMsQhWRmyQIxSV76vj+2BBwCxCCbhk7ItsraaH8EYGwn4ubaKeQOtPmXdwDdUX08u7yf+nh2OVG4tR6ThWJODEl3mvG93NGNLXomHGBE+lJxzrUvpoERJmU6RoXwlIaTJYuWzFwgRYlGoyXpshDDFuQ9JgKyTOlzPyLcIF2LruDVQCUnjWi1KjAweg30LDgczDzC5rbFBUNWQw8cK7ae4xqJq53Z6gj1MHqlzpEqXjNY4VoBRsYoy9pyGMOBTbaIp58kyqWeRCo6KvgsAIBUDCrjOK4oVBtYOE1sje4z4yDRD3oNLuH96s+Y4i+Bh0//gMZfHmpeFfjp8Zw6t+3vrcHgEZXMEIT5W+iv9PCMGrUVBVMectmAT3MzDT2GgwQ1BmAyeehrJKe7U23F++NKAsPIpx8jvdqqM3kQTsean0l8Mj4yH8llymfz8aS/5yZd3gRtB6zW3rCeIeOTEwvgPMDAnkdzZuE+SRzu0MJ5jlmcadFaMv20AiB3W9ksRmVMCqpyCjCVKcDgPQX2YFXlZv5JjKdHJg7pB694rHZGXtRip8IFemlHYR9FfLiiTlz944ljfWL6/RiOdMJnkpUO6Fkx8jSmMifQE6pUoqiY/YYjJ+QO5vvGyHRMHMYcbMkTiy2YetadngS8x3eudfQos5jc0noYK3d6vd4rM3FfJzJg4ooxIvtIFM/E0eQg5lUuZ4fw+JRDmaJm75E/4GTC51YVQcaEggw3o0ZOTTi9tvQotEsrGUshzLfa+P3RugAJ61rSkmHw8en7LKDVhFfJpJrjdtchvOlaep07amrVpCQDcjkRqZZjncKpbVxvTbG1sduGBz1n1KZR18rAefAbZPfx2g4acc6kHW9sfkJ8eCVkPYp1RiFlEm3AgmmdQXjCS73g2ipPuYgfPrRTdefoPz8NcujMKZbGrn+BvdGnOYhwVZEcakpJq0BKwHv6ESbRI5kdXN2buNNZXm8hpxNGwvFfKq/LHq7KZQMzha7ZC/HbNPz9OFwe7X9KjfMKPo+f8IqUStrGk9+2KfQIxJ7shCGgEJQrdPAWq1ite8hY6MsX95vOSJ87fUwMWIRSj3LdeR4rNav549yS3xQ70FllACq0tDIskAMixVL7L6O3+jmP1m58BNBfiUbxzHqxdJZc8wZeTGojV2TCg9VOZZ+eHdEdOTdO/84dQDzLGy8d4OtnoN4dzXa3XJqhiNhnMybhHfo4mrmXVIaozCf9uJP+wfY03sypqHhmARfpWycL+laVuljYw0ZXy42sWE5qTAQng1hB+hiKRUZXuIaHjMYIsWchOyZXdojIJnHZZwphQ8FHGBNAZt1+xxSCbRXPwFuQsd2Os45gX6GznHnomSkwt/mMZrEcHuePdpPYRXjOZAJ1R5brbj2FYG+WrLu2sni0UsYCaOSCjT4dmY5ve4K/DhN/tiodeEviyGMh5hz4nUARlYzN16Cdn4rvZjYTmesIcNpFOgIk8pHqUNAtbhOVzQRSZCM5lGaLdgeGEHw1QVEfk6B4dc8ExavTT1AkdN+IdhR9IBFRipm2p3/AB3g10pHxdPBTR+TTbIiPnbokw5g5I04P2mWauMYmysOVRP5QujxbNbp+e0b6A91S6lUqOxe7Aa51qSw3gvWhHtl5hHrzBh0HV5wS8foQqDUWCb9Ry6CNvKEX4scVxEQyKZ7ykbPa97O6e7YtxBBJv8WBmX0107c2LDg5iBm2TrG+C9ZuIjFSFXkhbWyRe5CBeXnPDPjLJxMxMC0pAtvMUfXdVK5IiTGuysfZdcNBYLAESWc0aIwlQQItzSVJ3KdMfR3nPmYqmfcHajjCyQrboBqXmDyVaK33ekmKPOzGLhe6RBSG7c1K+Uil7Lr1KO10tQ/JgmbpqavGmzvMmMnb/DD9c3lP/XN58vpn1jn3G64JOys5DfcIs2ly409qYUSrfwK5YapebjE5pFtjfjWmpFEs0hn68lUaNseTcPgOxgBw4TVsM2mjYFTfi7TlX4WCXFv+FcxV3fX+Jsp2zjposBzEaEzE86dLYFhGhULLmPmsAZ9TftxgdAgrGpb52qKQsrS2ZlBWUlGOaUozC711fh+flHuN0hL+dLp+pdopBCMo/04JV7+tRg2LJBEYa8HdSnwOm36ky6h6reei0bHZZzhXQ+B6+iJT2w5N0xCISL7SgO2pmIPsIyDgoxNUag9mzNzWEnukHzL97+X9BqbT504/QswZeDTBjuzQgudymxI5JG86iuDLuM6MqYoTaku1UnIOR44NR2IX/6dOFxtypxIQhx0yiZFInVNT6S/cQnLgdlL8FPQKvGB6NZG+ycRgdkjW1Bq6eiq07Hv+PwusUA3T480n/bYJ7nuHPdFZILmTh9QZvQr+YZDeV/dMaL6aCqSXYzGlHrqM98zLvLqcwDLS1+wo+gxggJpP9fF9wUxs+X4f8XIY5CMpE5G2TFVTdX6zw5f7VjHkdrCF9/JWXz29n7f66ukk5DZa4MLtckVJxglNwBjNkny3wT+pS3BIkf8SCfOvvsT9F+yczr0T6pWe3387OD3OTj27p516dvrnPc6JNbqlG1H18oDXeVC80rg46vIXm1pW6Ia5ryQlygE8nMX3Tlpi5SjKj3oiMLohinXq/a7odaQACl2mqifpYrWexIhYpxjpr205tEDgAZnhkMw6l1jiany9Moj+h8epD+K2E/7iTiecOyv6U/5iAjkopD20T8DiuXfnaI/0L1zWaxYglByUYZBmcwPTD8BXNEZRcPPMPxTsINNOoUCHMgYpUaW+2Xd6TNX71ct7Wq0J5FQZ7cF12q7xKnCDfCI8nQX7tkw/psXHEWOfOq0C3fpqRfrYV7YVDUVf6M1C/A8yslHWGk+yyG3tFBLQoqDdoCntdl70I3t+90CmvTL+CgdWYVHy5HaivAMOGiROJKb495pxpEo7UdIrm7nseVTUEF2tmwTdBnNigJVMBOx9esF1fs7LHj2uZA8BFkdsgxKc4tvYWrMiLzZ1EgN7oXpyqRxIWO5fJ8/4YkzTYxuzizicjM2+EkDj4HQI9OaN5yVGkAwoqhKBYqwb8I+OruLvLHCMfBoW6kMmAcr3BkXYta3RCIwiOne40Ohrnire3+e14hIGstKgcwTCaNn/tssd/xhZwfOa6V50kaezxpqOhNMganaHt9Zt+A42ENXcZhipr+dQ6z5nHijy3Y2Tv8a0EDh5WYr/c4eNg8PMCFMSS8nzspN710+O5w3i3FgFYrp9gV0F1WDTAjry+HuA/Ie0N9gNOijQMgxxGrEoQe+DjAnv5R3na/Bb8feXqUsw9vwlhPgeninSxheYiloy7Q5EjwIqetIUSvZRV08VEWmv5rnrd5y7niB6ZChoGdeROmvJzv1GM6c1mZEv2vdoW1LSejYvRzFCdqZNIVYaSu/8wxL9r+6Z6H81oUQ/2UNOMGX/fq15YuuKFMtBkzF4QGAbFXmmGGjiKArj6dkHVr9FPZuUV73jTrtkRtlrxWtjigd4BE0e3ADGV0TIJejil2rF2PCK+YLJvKtaAd/KrBDchw+9Cou8VNFqxn5pBuziWWYLedeSemYBzKAvbDGUGq09CD1Js9FNk7MUojXkACSW4ibQefsj29G+lX4KWJrUPDzqCc2dsJgoJdEDZoyiDZ4KrAaPHNvdcsNPppSPa1CDWRU6xnXrtUmuECPEH1ZAen1PoMPrCQAd1lYaBtzXmPA9AO9pL2av5kiCqNjTsJd9YKIoMq5igwE84ITTuOhKeLmNA2+b8guj0yNBc4xSmy4UDoNV3NjkogNFxlEfw/guzn/QM9FNk0bA2NatYraqwdtaKtkFjdEutaqt0zx/kcKgVaeMYk65kk5SHR8i3u0hb0kqhs9icWRsQRYpxZpofaRFHpZ2cN+4G5KdHoS5htsXc7dEborcz1DEwoRK4lPQYyoyBy17V3En0/woDhQ7gBNSfAPoTWzJoahS9aoWeYu1ReKGu+N34loWiTg8J2vgwUUwrkal5JoTmEnGYoq5D0QTCTlkf288POSSZ2gAGy361sIv9BwydTN/Gu7k7jDBlJNDRefwmEh0d3y7s8d4J/SFXUbHfu10+0Ck4Oun9zSgE0BcFZwjIlkyM6X7vcg6GtucxwiF67LiZyRYP3UaEwD3a7a5bgia1WQ/kSnb68VMH4yml/QIrn70pVrvEBwnKtc+ubbSa/QaoIAg0XvAIDrudLd9bJxNd46O91K84XAiw4X4Z2YiYVXPgcpKktrufXhS3BS28FQVuoCHGtexOR6KmT2LsRuQU5my5hi6v3cT58ymGT1Qs7NWvOP86n4S+KH/s1USjSmtw7DUMPtBR3b19Ln7zrNr3Fjtk/zSAVouexbR4bDT/ZeLnt47IqkiPiPvUnahr/aPbrCIYmJ1SrqZKPPIrfota61KmXZMf5yCh+Q72rruGnSs8+xH3SR/kMeTBu54y3F6I9cq+Z+cl4kz0dIc5UOPbj5It1FUgzwoEk8txlsTV/uj5VLEXlqWQ0QkWNmQsNuNuT6uYUdZGlCJW3TUIZzEHsYYdsmIpzy6TnEwSgaQL9pxy040wVvmwJKFs97n07amM+0tt+zumiKVuPAxA84i/litnUODd83SQWLGqRvbEyFhPChFvOBqnWXiNhxQX4ikx9r0u+C4sC1H4T5oJxoVK+ZLFbYcdG5tT4A2yEofhzIBBrgIOHMcY6t5P44dC8A2SJWDFVocNAts1UF/TCwo5ix+4iLmUYsyzYzi1D5SvkB6cyBOmzY+8Suc88gxxnpi3q87TNHl5HrbGqQ6vAAHNCc8JN8va88hj1Yl7AjvLhIVIzPYQC+XpVPcez9Wo/N2HBsZZtIcDpY0BXorazY8vUrdNHGs8NA8HXjDIn0ehVblrpE1/VLPt1d283zpu52Mwb9ImiiMrDXtilJxDE+BmpTRvlKx7ZSio64ccoX0EU3BK0NjIj0CHRnMGmS1NkTE/SlKriZnNfdDrFJfH7um//JF+5IgjWREQCLEvpSI16PXjFpl0Ro/1JOFwH/5iWJ69i2FQo0/9/RQq/SG17/T/Vw+J1ndv8X8RGOhFpcXr9+JmzIdX0qP/LHz5D7sDsX428LaC0/atkXO0KDJUzk7+vdWgXHr4muH8JZDMZWlXbrHP/x7L8Gv3IlWznLwby4H//BvB2o9SbFpJNaLMyqXSMVCdURkHgOS4aQVlQQOEtneH5cxXRtU3VonwStqyVOLiVdUkrrGkKpP1HutDWh/pDiYK6fwneMlGl4DXlmheBtvhMFLOduMHzYJyAu7tQYMVThETmTjylg2SyyBRWZ54RuG36hxc4EHCXEqbJduruS4mW8NP70AqKHsyTXRznauyq4A/nTHI5TNKuXP7JbuM3A5EZTA61gAjPf/S1BttRD/i77r6QcUd2kbGQH0765295yIvfv4m7J09/L/O68sqYfsDbErlP+xtOWO/qhCbX74v1BLBwijMwNJ/ycAABJ4AQBQSwMEFAAIAAgABZQsVAAAAAAAAAAAAAAAABEAAABPRUJQUy9jb250ZW50Lm9wZp1WwW7bMAy99ysEFdhlcGQ7LdpksYeuwIDdu8sugWLTiVBb8iS5Tf5+lOy4SuMi23KyaPI9PpKis/q6b2ryAtoIJTOazGJKQBaqFHKb0Z9P36N7+jW/WrW8eOZbIOgtTUZ31rZLxl5fX2eibKuZ0luWxvEdU21Fr8jxN+LOEffN3Enxu4NIlCCtqATojH5T6vlHGfh4omVZjFxtp2vPUxYMamgw1rBklrCJIAu6MZOR/s27kGXNnViQZ0gNlIJPq4W227AXVfANUyiz5gfDrgOAVkMl9hkVG1RmlmTA8BFdzfVhJmwnwcx429YwK1TDdFmx3j1wi2BvQboqmgi7w2h+5UlWDVhecsv/r1KBSGzZhYYOlJ62LJZvfSOiHFuX3yziapFuqmhxO7+NbtKbRcTT9C6CeZwU5eLu5j6dr9hJfP6G6+QQVzOsSUavB1Aso2pB2wMWcoyK7KEFSkyxQ20ZVVLslzixUAtjb2mepivm0N6Dv0ENAxIkQr0S5xZMJc37LM7gUIMVtob8u1JeUX+6yOfdAqr+3KOcU7ip7PDO5SA9yXi+yHP0DKhGk0f7u/I0uAWwDtjaNE7TKE6iJH1K7pfzdJkkv6ZSLjRwq/qxGJ6xiFz7/AfDxz0/RgSpVKKGiJsB5O/SxouJk7Bz/eNSyUOjOjOV7OgXup3YR/eLnHgRYSiTq9IUnXMJPY6mi9habHcWS/BQ16R/xpoZ0C8wOZm9S/6o2oN/JJ+u93H8sPhCHDnZHMip3MH/XRqSu6tVuNVGSaEk7iCLd7DBEVr3VjYdsgUJum/jGOZ2ZYQvKGEfyx0WpWmh8FMXVRiOsq3u4Kiz33zsuPrGVcilqMDYAFxYaPwYymJPyQ6HLKNWFTN/9Gvdb5GMuvUrCm5xwbJ9VNoNenzGxXia6wiHGCHcfmed64eA7nWPNggVbtIlf6GT6IUxR3RjD+6z4AwhusXPAfNWFmzlyacJ+L4h63jtTOv4yBWv7Y7LZ4Ml1xFeQvfx/wdpgZR39NiqsTW9wbR42QmWru/MxBU7O4waMFeU4TM+UxLkcAJw9RGCbyS7xD+o8Fn3vqtth1+IoHmIBhr/MqGqsUOU+NWe0Se+qYGoijz2CZ/PzpDCig24Kzb81cr/AFBLBwj7Z0DnVAMAAJsJAABQSwMEFAAIAAgABZQsVAAAAAAAAAAAAAAAAA8AAABPRUJQUy9zdHlsZS5jc3NtUNEOgjAMfN9XNCE+YiBmi9u+ZmNTFgYlMBLU+O/CBINo+9T2enft0baDTtUQSuzgQWCKAj12AhJKqSRPQo4R4l1TLYBadVfXpBpDwFrAKWvHPVDtuBhjMjYu2IS0d3crgGeH91rA4tvBHvTX1by1MbXOOec/Sme6kBjXt17dBGiPRRV5ylVUY2fsxJDJTfk5Mm9H6NE7A4mxc8rNKwSw6QeQx4NeUEsHCJuR0VimAAAAUgEAAFBLAwQUAAgACAAFlCxUAAAAAAAAAAAAAAAADQAAAE9FQlBTL3RvYy5uY3iFlM1ymzAUhfc8haq9EGC7MRlBpu1MVv3Jwl17BJKNpiAx4hKTPn0FJTUuhLCS0PnO6BzuwB66qkTP0jbK6ASHfoCR1LkRSp8T/PPwSPb4IfWYzjvklLpJcAFQ31N6uVx8wVXz4ht7pr838f4jjYJgR52U4qtl/46EOPWQe1ghufi7HLaVBI40r2SCBWT3rRIY5UaD1JDgbRyc4ig7kXi32ZFttI0Jj6I7IjdBmIv4bruPNhjRt+3OUkvLwdiJqazbjLgDvMIJWUMxYcI1MRjg5RM/yy+m1TChgjWq4l3PfG+rTNoliNFrVUyY/KCglBM/kB2kj8YwOqxG5lbYc59aKIz9H/zM7QycKpnmz994fcXmi9nmlXsySgNSIsFjqmNwVCCroxutuuQvP6yQtk+K8pI3bqDygtfgWkhndq+WX3kmy+Xja6bQR4eC618NOhmLrGvPzfCHacwZR9e92RgANTZ3Fz7CYE+cPRnt/a6Aqpx+6BvvoYp0uTLPWy4NTH7TU/hOTyv9jEOitGqKpR7eyn+b211oHnMa753Z8P7ph4li/Q8i/QNQSwcIsH+/gqcBAAB4BAAAUEsDBBQACAAIAAWULFQAAAAAAAAAAAAAAAAPAAAAT0VCUFMvdG9jLnhodG1shVKxTsMwEN37FcZ74gQGaOS4A9AVhjIwITe5NFZdO4qPpv17LolbCRUJL77zvfN772y5Oh0sO0IfjHclz9OMM3CVr43blfxjs06e+Eot5N3L2/Pm8/2VtXiwlI8bo1YXSt4idoUQwzCkw0Pq+53Il8ulOI0YPoMK6L63v5Cm7poJe59lj8J3YUIWVo+84Di7RiMb6FotGC2JBi2otfdSzOF8fADUrGp1HwAvupmIRWvcnvVgSx7wbCG0AMgZnjsoOcIJRRWIvu2hiYh0OqB2KWZqufX1eRSSs8rqMJrOuVobZ0JLmJxKTh+ZqelCX9EIyW4RCSiPOrydg3Fdg5skSr4Qod5aSHyTVN4hOOTqBj116Ggg+8JWu31IGt8nPamnl0znt1CbqcKowmLlTgp9e6EU1qi/Ff5jYDYqRqdS0EjUgvY4PDH9nR9QSwcI38bkZUkBAAByAgAAUEsBAi0DCgAAAAAABZQsVG9hqywUAAAAFAAAAAgAAAAAAAAAAAAgAKSBAAAAAG1pbWV0eXBlUEsBAi0DFAAIAAgABZQsVALlLa6nAAAA7wAAABYAAAAAAAAAAAAgAKSBOgAAAE1FVEEtSU5GL2NvbnRhaW5lci54bWxQSwECLQMUAAgACAAFlCxUozMDSf8nAAASeAEAIAAAAAAAAAAAACAApIElAQAAT0VCUFMvMF90aGFua3MtZm9yLXJlYWRpbmcueGh0bWxQSwECLQMUAAgACAAFlCxU+2dA51QDAACbCQAAEQAAAAAAAAAAACAApIFyKQAAT0VCUFMvY29udGVudC5vcGZQSwECLQMUAAgACAAFlCxUm5HRWKYAAABSAQAADwAAAAAAAAAAACAApIEFLQAAT0VCUFMvc3R5bGUuY3NzUEsBAi0DFAAIAAgABZQsVLB/v4KnAQAAeAQAAA0AAAAAAAAAAAAgAKSB6C0AAE9FQlBTL3RvYy5uY3hQSwECLQMUAAgACAAFlCxU38bkZUkBAAByAgAADwAAAAAAAAAAACAApIHKLwAAT0VCUFMvdG9jLnhodG1sUEsFBgAAAAAHAAcAvAEAAFAxAAAAAA==`,
        }}
        // src={{ uri: 'https://s3.amazonaws.com/moby-dick/OPS/package.opf' }}
        width={width}
        height={height * 0.8}
        renderLoadingComponent={() => (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>Loading...</Text>
          </View>
        )}
        initialLocation="epubcfi(/6/2!/4/2[docs-internal-guid-6b08c32b-7fff-1fdc-5991-d65cd24343e2]/62/4/1:5)"
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        }}
      >
        <Text onPress={() => console.log(getCurrentLocation())}>
          getCurrentLocation
        </Text>

        <Text onPress={() => console.log(getLocations())}>getLocations</Text>

        <Text onPress={() => updateTheme('default')}>updateTheme</Text>

        <Text onPress={() => changeFontSize('24pt')}>changeFontSize</Text>

        <Text onPress={() => changeFontFamily('cursive')}>
          changeFontFamily
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 10,
        }}
      >
        <Text>progress: {progress}</Text>

        <Text>
          currentLocation: {currentLocation?.end.location} totalLocations:{' '}
          {totalLocations}
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <Text>atStart: {String(atStart)}</Text>

        <Text>atEnd: {String(atEnd)}</Text>
      </View>
    </View>
  );
}
