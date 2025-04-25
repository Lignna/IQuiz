package demo.enums;

public enum ResStatus {
    SUCCESS("success"),
    FAIL("fail");

    // fields that enum constant store
    private final String value;

    // Constructor to set the value
    ResStatus(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value.toLowerCase();
    }
}
