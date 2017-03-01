package com.sunsoft.zyebiz.b2e.mvp.forgetPwd.presenter;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.api.ApiUrl;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.enity.net.forgetPwd.ForgetPassBean;
import com.sunsoft.zyebiz.b2e.mvp.base.BasePresenter;
import com.sunsoft.zyebiz.b2e.mvp.forgetPwd.ForgetPassFragment;
import com.sunsoft.zyebiz.b2e.mvp.forgetPwd.ForgetPasswordContract;
import com.sunsoft.zyebiz.b2e.mvp.forgetPwd.model.ForgetPass1Model;
import com.sunsoft.zyebiz.b2e.utils.localUtil.EmptyUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.ToastUtil;

import java.util.HashMap;

/**
 * Created by Amoly.
 * Data：2017/2/20.
 */

public class ForgetPass1presenter extends BasePresenter<ForgetPassFragment>implements ForgetPasswordContract.IForgetPassPresenter{

    private ForgetPass1Model mForgetPass1Model;

    public ForgetPass1presenter(ForgetPassFragment view) {
        super(view);
    }

    @Override
    protected void createModel() {
        mForgetPass1Model = new ForgetPass1Model(new ISecondaryCallBackData() {
            @Override
            public void OnSuccess(String tag, Object result) {
                ForgetPassBean forgetPassBean = (ForgetPassBean) result;
                String userName = forgetPassBean.getBody().getUserName();
                String mobilePhone = forgetPassBean.getBody().getMobilePhone();
                String token = forgetPassBean.getBody().getToken();
                if("0".equals(forgetPassBean.getTitle())){                       /*成功*/
                    mvpView.jumpToNext(userName,mobilePhone,token);
                }else if ("1".equals(forgetPassBean.getTitle())){               /*失败*/
                    ToastUtil.toastDes(forgetPassBean.getMessage());
                }

            }

            @Override
            public void OnError(String tag, String error) {

            }
        });

    }

    @Override
    public void nextStep() {
        if (!checkJumpView()){
            return;
        }
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("userName",mvpView.getUserName());
        mForgetPass1Model.ForgetPassRequest(ApiUrl.FORGETPWD,hashMap);
    }

    @Override
    public boolean checkJumpView() {
        if(EmptyUtil.isEmpty(mvpView.getUserName())){
            ToastUtil.toastDes(R.string.input_username);
            return false;
        }
        return true;
    }

}
