package ru.asavan.mouseramrod;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import java.util.LinkedHashMap;
import java.util.Map;


public class AndroidWebServerActivity extends Activity {
    private static final int STATIC_CONTENT_PORT = 8080;
    private static final int WEB_SOCKET_PORT = 8088;
    private static final String WEB_GAME_URL = "https://asavan.github.io/mouse-ramrod";
    public static final String MAIN_LOG_TAG = "MOUSERAMROD_TAG";
    private static final boolean secure = false;

    private BtnUtils btnUtils;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        btnUtils = new BtnUtils(this, STATIC_CONTENT_PORT);
        try {
            addButtons(IpUtils.getIPAddressSafe());
            Map<String, String> mainParams = new LinkedHashMap<>();
            HostUtils hostUtils = new HostUtils(STATIC_CONTENT_PORT, WEB_SOCKET_PORT, secure);
            btnUtils.launchTwa(hostUtils.getStaticHost(IpUtils.LOCALHOST), mainParams);
        } catch (Exception e) {
            Log.e(MAIN_LOG_TAG, "main", e);
        }
    }

    private void addButtons(String formattedIpAddress) {
        HostUtils hostUtils = new HostUtils(STATIC_CONTENT_PORT, WEB_SOCKET_PORT, secure);
        final String host = hostUtils.getStaticHost(formattedIpAddress);
        {
            Map<String, String> mainParams = new LinkedHashMap<>();
            btnUtils.addButtonTwa(hostUtils.getStaticHost(IpUtils.LOCALHOST), mainParams, R.id.twa_real_ip, host);
            btnUtils.addButtonTwa(WEB_GAME_URL, mainParams, R.id.newest);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (btnUtils != null) {
            btnUtils.onDestroy();
        }
    }
}
