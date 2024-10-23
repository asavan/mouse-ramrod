package ru.asavan.mouseramrod;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.widget.Button;

import com.google.androidbrowserhelper.trusted.TwaLauncher;

import java.util.Map;

import androidx.browser.trusted.TrustedWebActivityIntentBuilder;

public class BtnUtils {
    private final int staticContentPort;
    private final Activity activity;
    private AndroidStaticAssetsServer server = null;

    public BtnUtils(Activity activity, int staticContentPort) {
        this.staticContentPort = staticContentPort;
        this.activity = activity;
    }

    public void addButtonTwa(String host, Map<String, String> parameters, int id) {
        addButtonTwa(host, parameters, id, null);
    }

    public void addButtonTwa(String host, Map<String, String> parameters, int id, String text) {
        Button btn = activity.findViewById(id);
        if (text != null) {
            btn.setText(text);
        }
        btn.setOnClickListener(v -> launchTwa(host, parameters));
    }

    private void launchBrowser(String host, Map<String, String> parameters) {
        startServerAndSocket();
        Uri launchUri = Uri.parse(UrlUtils.getLaunchUrl(host, parameters));
        activity.startActivity(new Intent(Intent.ACTION_VIEW, launchUri));
    }

    public void launchTwa(String host, Map<String, String> parameters) {
        startServerAndSocket();
        Uri launchUri = Uri.parse(UrlUtils.getLaunchUrl(host, parameters));
        TwaLauncher launcher = new TwaLauncher(activity);
        launcher.launch(new TrustedWebActivityIntentBuilder(launchUri), null, null, null);
    }

    private void startServerAndSocket() {
        if (server != null) {
            return;
        }
        try {
            Context applicationContext = activity.getApplicationContext();
            server = new AndroidStaticAssetsServer(applicationContext, staticContentPort);
        } catch (Exception e) {
            Log.e("BTN_UTILS", "main", e);
        }
    }

    protected void onDestroy() {
        if (server != null) {
            server.stop();
        }
    }
}
