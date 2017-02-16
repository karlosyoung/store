/**
 * TODO
 * CoupleWorld02--HttpUtils.java
 * Copyright qianbaiyang
 * @2012-6-4
 */
package com.sunsoft.zyebiz.b2e.common.module;

import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;

import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.utils.localUtil.fileUtil.FileTools;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import static com.sunsoft.zyebiz.b2e.utils.localUtil.fileUtil.FileTools.getSDPath;


/**
 * @author
 * 
 */
public class DownloadFile {

	private static final int BUFFER_SIZE = 1024;

	public static void downloadFile(String url, File file) {
		InputStream inputStream = null;
		HttpURLConnection con = null;
		try {
			URL uRl = new URL(url);
			if (file.exists()) {
				file.delete();
			}
			
			file.createNewFile();
			if (uRl != null) {
				con = (HttpURLConnection) uRl.openConnection();
				con.setRequestMethod("GET");
				con.setConnectTimeout(10000);
				con.setReadTimeout(30000);
				inputStream = (InputStream) con.getContent();
				ByteArrayOutputStream outstream = new ByteArrayOutputStream();
				byte[] buffer = new byte[BUFFER_SIZE]; // 用数据装
				int len = -1;
				while ((len = inputStream.read(buffer)) != -1) {
					outstream.write(buffer, 0, len);
				}
				FileOutputStream outStream = new FileOutputStream(file);// 写出对象
				outStream.write(outstream.toByteArray());// 写入
				outstream.flush();
				outStream.close(); // 关闭流
				outstream.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (null != inputStream) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	/***
	 * 
	 * @param downloadUrl
	 *            下载地址
	 * @param fileName
	 *            文件名
	 * @param suffix
	 *            子目录(xx/)
	 * @return
	 */
	public static boolean downloadFile(String downloadUrl, String fileName,
			String suffix) {
		boolean result = false;

		InputStream is = null;
		FileOutputStream fos = null;
		try {
			URL url = new URL(downloadUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			if (null == conn) {
				return false;
			}

			// 读取超时时间 毫秒级
			conn.setConnectTimeout(10000);
			conn.setReadTimeout(30000);
			conn.setRequestMethod("GET");
			conn.setDoInput(true);
			conn.connect();
			if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
				is = conn.getInputStream();

				File files;
				String temp = TextUtils.isEmpty(suffix) ? "" : suffix;
				if (FileTools.isFolderExists(getSDPath()+ Constants.DOWNLOADDIR + temp)) {

					files = new File(getSDPath()
							+ Constants.DOWNLOADDIR + temp + fileName);

					if (files.exists()) {
						files.delete();
					}
					files.createNewFile();

					fos = new FileOutputStream(files);
					byte[] buffer = new byte[BUFFER_SIZE];
					int i = 0;
					while ((i = is.read(buffer)) != -1) {
						fos.write(buffer, 0, i);
					}

					fos.flush();
					result = true;

				} else {
					result = false;
				}
			} else {
				result = false;
			}

		} catch (Exception e) {
			result = false;
		} finally {
			try {
				if (fos != null) {
					fos.close();
				}
				if (is != null) {
					is.close();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return result;
	}

	/**
	 *
	 * Desc:文件下载
	 *
	 * @param downloadUrl
	 * 
	 * 下载URL
	 * 
	 * @param fileName
	 * 
	 * 保存文件路径
	 * 
	 * @return ture:下载成功false:下载失败
	 */

	public static boolean downloadFileWithProgress(String downloadUrl,
			String fileName, Handler mHandler) {
		int fileSize = -1;
		int downFileSize = 0;
		boolean result = false;
//		int progress = 0;

		InputStream is = null;
		FileOutputStream fos = null;
		try {
			URL url = new URL(downloadUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			if (null == conn) {
				return false;
			}

			// 读取超时时间 毫秒级
			conn.setConnectTimeout(10000);
			conn.setReadTimeout(30000);
			conn.setRequestMethod("GET");
			conn.setDoInput(true);
			conn.connect();
			if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
				fileSize = conn.getContentLength();
				is = conn.getInputStream();

				// 开始发送下载消息
				Message msg = new Message();
				msg.what = Constants.DOWNLOADSTARTS;
				msg.obj = fileSize > 0 ? true : false;
				msg.arg1 = fileSize;
				mHandler.sendMessage(msg);

				File files;
				String filePath = FileTools.getSDPath() + Constants.DOWNLOADDIR;
				if (FileTools.isFolderExists(filePath)) {
					files = new File(filePath + fileName);

					HashMap<String, String> map = new HashMap<String, String>();
					map.put("filePath", filePath);
					map.put("fileName", fileName);

					if (files.exists()) {
						files.delete();
					}
					files.createNewFile();

					fos = new FileOutputStream(files);
					byte[] buffer = new byte[BUFFER_SIZE];
					int i = 0;
//					int tempProgress = -1;
					while ((i = is.read(buffer)) != -1) {
						downFileSize = downFileSize + i;
						fos.write(buffer, 0, i);

						if (fileSize > 0) {
							// 下载进度
//							progress = (int) (downFileSize * 100.0 / fileSize);

							Message mssg = new Message();
							if (downFileSize == fileSize) {
								// 下载完成

								mssg.what = Constants.DOWNLOADFINISHED;
								mssg.obj = map;
								mHandler.sendMessage(mssg);
							} else /* if (tempProgress != progress) */{
								// 下载进度发生改变，则发送Message
								mssg.what = Constants.DOWNLOADLOADING;
								mssg.arg1 = downFileSize;
								mHandler.sendMessage(mssg);
							}
						}
					}
					fos.flush();
					result = true;

					if (fileSize <= 0) {
						Message msgF = new Message();
						msgF.what = Constants.DOWNLOADFINISHED;
						msgF.obj = map;
						mHandler.sendMessage(msgF);
					}
				} else {
					result = false;
				}
			} else {
				result = false;
			}
		} catch (Exception e) {
			result = false;
		} finally {
			try {
				if (fos != null) {
					fos.close();
				}
				if (is != null) {
					is.close();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		if (!result) {
			Message msgF = new Message();
			msgF.what = Constants.DOWNLOADFAILED;
			mHandler.sendMessage(msgF);
		}
		return result;
	}

}
