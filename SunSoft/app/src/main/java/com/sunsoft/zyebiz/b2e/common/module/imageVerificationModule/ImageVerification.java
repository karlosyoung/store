package com.sunsoft.zyebiz.b2e.common.module.imageVerificationModule;

import android.support.v4.app.Fragment;
import android.widget.ImageView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.api.ApiUrl;
import com.sunsoft.zyebiz.b2e.common.net.loadImage.LoadImageMethod;
import com.sunsoft.zyebiz.b2e.utils.localUtil.PhoneUniqueUtil;

/**
 * 图片验证码
 * Created by MJX on 2017/2/9.
 */
public class ImageVerification {
    /**
     * 请求图片验证码
     * @param mvpView
     * @param imageView
     */
    public static void requestImageVerification(Fragment mvpView, ImageView imageView){
        long currentTime = System.currentTimeMillis();
        String uniqueNo = PhoneUniqueUtil.getUniqueStr();
        String url = ApiUrl.BASE_URL + ApiUrl.VERIFICATION_CODE +"?uniqueNo="+uniqueNo+"&sourceType=1&"+currentTime;
        LoadImageMethod.loadWithNoCache(mvpView,url, R.drawable.verficate_code_bg,imageView);
    }
}
