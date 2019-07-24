package nim.webrtc.api.util;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.net.URISyntaxException;

public class ProxyUtil {

    public static JSONObject post(String url, HttpEntity entity) throws IOException, URISyntaxException {
        return post(url, entity, "application/json");
    }

    public static JSONObject post(String url, HttpEntity entity, String headerContentType) throws IOException, URISyntaxException {
        HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
        CloseableHttpClient closeableHttpClient = httpClientBuilder.build();
        HttpPost post = new HttpPost(url);
        RequestConfig requestConfig = RequestConfig.custom()
                .setSocketTimeout(16000)
                .setConnectTimeout(16000)
                .setConnectionRequestTimeout(16000)
                .build();
        post.setConfig(requestConfig);

        post.setHeader("Content-type", headerContentType);
        post.setEntity(entity);
        CloseableHttpResponse response = closeableHttpClient.execute(post);
        String str = EntityUtils.toString(response.getEntity());
        JSONObject json = JSONObject.parseObject(str);
        response.close();
        return json;
    }

    public static JSONObject get(String url) throws IOException {
        CloseableHttpClient client = HttpClientBuilder.create().build();
        HttpGet httpGet = new HttpGet(url);
        httpGet.setHeader("Content-type", "application/json;charset=utf-8");
        CloseableHttpResponse response = client.execute(httpGet);
        String str = EntityUtils.toString(response.getEntity());
        JSONObject json = JSONObject.parseObject(str);
        response.close();
        return json;
    }
}
