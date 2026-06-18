ARG PYTHON_VERSION=3.12
FROM python:${PYTHON_VERSION}-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /usr/src/backend

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

COPY --chown=root:root --chmod=755 src/ ./src/
COPY --chown=root:root --chmod=755 requirements.txt ./

RUN mkdir -p /app/data && \
    chown -R appuser:appuser /app/data && \
    chmod 755 /app/data

USER appuser

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--reload", "--host=0.0.0.0", "--port=8000"]