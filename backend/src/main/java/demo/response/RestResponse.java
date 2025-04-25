package demo.response;

import demo.enums.ResStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class RestResponse {
    private ResStatus status;
    private String message;
    private String cause;
    private Object data;

    public RestResponse(ResStatus status, String message, String cause, Object data) {
        this.status = status;
        this.message = message;
        this.cause = cause;
        this.data = data;
    }

    // Static Factory Methods
    public static RestResponse success() {
        return new RestResponse(ResStatus.SUCCESS, null, null, null);
    }

    public static RestResponse success(String message) {
        return new RestResponse(ResStatus.SUCCESS, message, null, null);
    }

    public static RestResponse success(Object data) {
        return new RestResponse(ResStatus.SUCCESS, null, null, data);
    }

    public static RestResponse success(String message, Object data) {
        return new RestResponse(ResStatus.SUCCESS, message, null, data);
    }

    public static RestResponse failure() {
        return new RestResponse(ResStatus.FAIL, null, null, null);
    }
    public static RestResponse failure(String message) {
        return new RestResponse(ResStatus.FAIL, message, null, null);
    }

    public static RestResponse failure(String message, String cause) {
        return new RestResponse(ResStatus.FAIL, message, cause, null);
    }

    public Map<String, Object> toMap() {
        Map<String, Object> json = new HashMap<>();
        json.put("status", status.toString());
        if (message != null) json.put("message", message);
        if (cause != null) json.put("cause", cause);
        if (data != null) json.put("data", data);
        return json;
    }
}
