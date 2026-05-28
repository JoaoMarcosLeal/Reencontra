# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.12
FROM python:${PYTHON_VERSION}-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

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


# Copia os arquivos como ROOT primeiro, mas muda a propriedade deles para o appuser
COPY --chown=appuser:appuser . .

# Garante explicitamente que o appuser tenha permissão total na pasta /app
RUN chmod -R 755 /app

# Muda para o usuário não-privilegiado
#USER appuser

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--reload", "--host=0.0.0.0", "--port=8000"]