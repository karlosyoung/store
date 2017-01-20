package com.sunsoft.zyebiz.b2e.utils.localUtil;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 非空的判断
 * Created by MJX on 2017/1/12.
 */
public class EmptyUtil {

    /**
     *
     * 判断是否为空，为空返回true,非空返回false
     *
     *
     * @param obj
     *
     * @return
     */
    public static boolean isEmpty(Object obj) {

        if (obj == null) {

            return true;
        }

        if (obj instanceof String) {

            String str = (String) obj;

            return "".equals(str.trim());

        }

        if (obj instanceof Number) {

            Number num = (Number) obj;

            return num.byteValue() == 0;

        }

        if (obj instanceof Collection) {

            Collection col = (Collection) obj;

            return col.isEmpty();

        }

        if (obj instanceof Map) {

            Map map = (Map) obj;

            return map.isEmpty();

        }

        if (obj.getClass().getSimpleName().endsWith("[]")) {

            List<Object> list = Arrays.asList(obj);

            Object[] objs = (Object[]) list.get(0);

            return objs.length == 0;

        }

        return false;

    }

    /**
     *
     * 判断是否不为空，不为空返回true,为空返回false
     *
     *
     *
     * @param obj
     *
     * @return
     */

    public static boolean isNotEmpty(Object obj) {

        return !isEmpty(obj);

    }

}
