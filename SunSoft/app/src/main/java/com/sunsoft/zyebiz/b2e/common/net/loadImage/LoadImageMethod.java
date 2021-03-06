package com.sunsoft.zyebiz.b2e.common.net.loadImage;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;

import jp.wasabeef.glide.transformations.RoundedCornersTransformation;

/**
 * 加载图片
 * Created by MJX on 2017/2/9.
 */
public class LoadImageMethod {

    /**
     *
     * @param fragment
     * @param url
     * @param defaultId
     * @param imageView
     */
    public static void loadWithNoCache(Fragment fragment,String url,int defaultId,ImageView imageView){
        Glide.with(fragment).load(url)
                .placeholder(defaultId)
                .error(defaultId)
                .diskCacheStrategy(DiskCacheStrategy.NONE).into(imageView);

    /*    .skipMemoryCache(true)*/
    }

    /**
     *
     * @param activity
     * @param url
     * @param defaultId
     * @param imageView
     */
    public static void loadWithNoCache(FragmentActivity activity, String url,int defaultId,ImageView imageView){
        Glide.with(activity).load(url)
                .placeholder(defaultId)
                .skipMemoryCache(true).diskCacheStrategy(DiskCacheStrategy.NONE).into(imageView);
    }

    /**
     * 裁剪圆角图片
     * @param activity
     * @param url
     * @param defaultId
     * @param imageView
     */
    public static void loadCropCircleCorner(FragmentActivity activity,String url,int defaultId,ImageView imageView){
        Glide.with(activity).load(url)
                .placeholder(defaultId)
                .error(defaultId)
                .bitmapTransform(new RoundedCornersTransformation(activity,30,0, RoundedCornersTransformation.CornerType.ALL))
                .skipMemoryCache(true).diskCacheStrategy(DiskCacheStrategy.NONE).into(imageView);
    }

}
